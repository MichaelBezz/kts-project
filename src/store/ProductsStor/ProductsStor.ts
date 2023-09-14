import { AxiosInstance } from 'axios';
import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { APIRoute } from 'config/api-route';
import { ILocalStore } from 'hooks/useLocalStore';
import { api } from 'services/api';
import { ProductApi, ProductModel, normalizeProduct } from 'store/models/product';
import { CollectionModel, getInitialCollectionModel, normalizeCollection, linearizeCollection } from 'store/models/shared';
import { Meta } from 'utils/meta';

type PrivateFields = '_list' | '_meta';

export default class ProductsStor implements ILocalStore {
  private readonly _api: AxiosInstance = api;

  private _list: CollectionModel<number, ProductModel> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductsStor, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      isLoading: computed,
      getList: action
    });
  }

  get list(): ProductModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  get isLoading(): boolean {
    return this._meta === Meta.loading;
  }

  async getList(offset = 0, limit = 0): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const { data } = await this._api.get<ProductApi[]>(
      `${APIRoute.products}?offset=${offset}&limit=${limit}`
    );

    runInAction(() => {
      if (!data) {
        this._meta = Meta.error;
      }

      try {
        this._list = normalizeCollection(data, (item) => item.id, normalizeProduct);
        this._meta = Meta.success;
      } catch (error) {
        this._list = getInitialCollectionModel();
        this._meta = Meta.error;
      }
    });
  }

  destroy(): void {}
}
