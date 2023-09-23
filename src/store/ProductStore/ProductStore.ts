import { AxiosInstance } from 'axios';
import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { APIRoute } from 'config/api-route';
import ProductModel, { ProductServer } from 'models/ProductModel';
import { api } from 'services/api';
import { ILocalStore } from 'store/hooks';
import { Meta } from 'utils/meta';

export interface IProductStore {
  getProduct: (id: string) => void;
};

type PrivateFields =
  | '_product'
  | '_meta';

export default class ProductStore implements IProductStore, ILocalStore {
  private readonly _api: AxiosInstance = api;

  private _product: ProductModel = new ProductModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable.ref,
      _meta: observable,

      product: computed,
      meta: computed,
      isLoading: computed,
      isSuccess: computed,
      isError: computed,

      getProduct: action.bound,
    });
  }

  get product(): ProductModel {
    return this._product;
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
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;

    const { data } = await this._api.get<ProductServer>(`${APIRoute.products}/${id}`);

    if (data) {
      runInAction(() => {
        this._product = ProductModel.fromJson(data);
        this._meta = Meta.success;
      });
    } else {
      this._meta = Meta.error;
    }
  }

  destroy(): void {}
}
