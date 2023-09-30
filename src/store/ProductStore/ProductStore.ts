import { AxiosInstance } from 'axios';
import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { APIRoute } from 'config/api-route';
import ListModel from 'models/ListModel';
import ProductModel, { ProductServer } from 'models/ProductModel';
import { api } from 'services/api';
import { ILocalStore } from 'store/hooks';
import { Meta } from 'utils/meta';

export interface IProductStore {
  getProduct: (id: string) => void;
  getRelatedProducts: (product: ProductModel) => void;
};

type PrivateFields =
  | '_product'
  | '_relatedProducts'
  | '_meta';

export default class ProductStore implements IProductStore, ILocalStore {
  private readonly _api: AxiosInstance = api;

  private _product: ProductModel = new ProductModel();
  private _relatedProducts: ListModel<ProductModel> = new ListModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable.ref,
      _relatedProducts: observable.ref,
      _meta: observable,

      product: computed,
      relatedProducts: computed,
      meta: computed,
      isLoading: computed,
      isSuccess: computed,
      isError: computed,

      getProduct: action.bound,
      getRelatedProducts: action.bound,
    });
  }

  get product(): ProductModel {
    return this._product;
  }

  get relatedProducts(): ProductModel[] {
    return this._relatedProducts.items;
  }

  get meta(): Meta {
    return this._meta;
  }

  get isLoading(): boolean {
    return this._meta === Meta.loading;
  }

  get isSuccess(): boolean {
    return this._meta === Meta.success;
  }

  get isError(): boolean {
    return this._meta === Meta.error;
  }

  async getProduct(id: string): Promise<void> {
    if (this.isLoading) {
      return;
    }

    this._meta = Meta.loading;

    const { data } = await this._api.get<ProductServer>(`${APIRoute.products}/${id}`);

    if (data) {
      runInAction(() => {
        this._product = ProductModel.fromJson(data);
        this._meta = Meta.success;
        this.getRelatedProducts(this._product);
      });
    } else {
      this._meta = Meta.error;
    }
  }

  async getRelatedProducts(product: ProductModel): Promise<void> {
    if (this.isLoading) {
      return;
    }

    this._meta = Meta.loading;

    const { data } = await this._api<ProductServer[]>({
      url: APIRoute.products,
      params: {
        offset: 1,
        limit: 3,
        categoryId: product.category.id,
      }
    });

    if (data) {
      runInAction(() => {
        this._relatedProducts = new ListModel<ProductModel>(ProductModel.normalizeProductList(data));
        this._meta = Meta.success;
      });
    } else {
      this._meta = Meta.error;
    }
  }

  destroy(): void {}
}
