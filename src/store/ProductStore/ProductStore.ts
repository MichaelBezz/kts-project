import { AxiosInstance } from 'axios';
import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { APIRoute } from 'config/api-route';
import ProductModel, { ProductServer, IProduct } from 'entities/ProductModel';
import { api } from 'services/api';
import { ILocalStore } from 'store/hooks/useLocalStore';
import { Meta } from 'utils/meta';

export interface IProductStore {
  getProduct: (id: string) => void;
};

type PrivateFields =
  | '_product'
  | '_meta';

export default class ProductStore implements IProductStore, ILocalStore {
  private readonly _api: AxiosInstance = api;

  private _product: IProduct = ProductModel.getInitialProductModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable.ref,
      product: computed,

      _meta: observable,
      meta: computed,

      isLoading: computed,
      isSuccess: computed,
      isError: computed,

      getProduct: action.bound
    });
  }

  get product(): IProduct {
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
    this._product = ProductModel.getInitialProductModel();
    this._meta = Meta.loading;

    try {
      const { data } = await this._api.get<ProductServer>(`${APIRoute.products}/${id}`);

      runInAction(() => {
        this._product = ProductModel.fromJson(data);
        this._meta = Meta.success;
      });
    } catch (error) {
      this._product = ProductModel.getInitialProductModel();
      this._meta = Meta.error;
    }
  }

  destroy(): void {}
}
