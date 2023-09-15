import { AxiosInstance } from 'axios';
import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { APIRoute } from 'config/api-route';
import { api } from 'services/api';
import { ILocalStore } from 'store/hooks/useLocalStore';
import { ProductApi, ProductModel, getInitialProductModel, normalizeProduct } from 'store/models/product';
import { Meta } from 'utils/meta';

export interface IProductStore {
  getProduct: (id: string) => void;
}

type PrivateFields = '_product' | '_meta';

export default class ProductStore implements IProductStore, ILocalStore {
  private readonly _api: AxiosInstance = api;

  private _product: ProductModel = getInitialProductModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable.ref,
      _meta: observable,
      product: computed,
      meta: computed,
      isLoading: computed,
      getProduct: action.bound
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

  async getProduct(id: string): Promise<void> {
    this._product = getInitialProductModel();
    this._meta = Meta.loading;

    try {
      const { data } = await this._api.get<ProductApi>(`${APIRoute.products}/${id}`);

      runInAction(() => {
        this._product = normalizeProduct(data);
        this._meta = Meta.success;
      });
    } catch (error) {
      this._product = getInitialProductModel();
      this._meta = Meta.error;
    }
  }

  destroy(): void {}
}
