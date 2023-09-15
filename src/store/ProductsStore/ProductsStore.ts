import { AxiosInstance } from 'axios';
import { makeObservable, observable, computed, action, runInAction, reaction } from 'mobx';
import { APIRoute } from 'config/api-route';
import { api } from 'services/api';
import rootStore from 'store/RootStore';
import { ILocalStore } from 'store/hooks/useLocalStore';
import { ProductApi, ProductModel, normalizeProduct } from 'store/models/product';
import { CollectionModel, getInitialCollectionModel, normalizeCollection, linearizeCollection } from 'store/models/shared';
import { Meta } from 'utils/meta';

type PrivateFields = '_list' | '_meta';

export default class ProductsStore implements ILocalStore {
  private readonly _api: AxiosInstance = api;

  private _list: CollectionModel<number, ProductModel> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
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
    this._list = getInitialCollectionModel();
    this._meta = Meta.loading;

    try {
      const { data } = await this._api.get<ProductApi[]>(
        `${APIRoute.products}?offset=${offset}&limit=${limit}`
      );

      runInAction(() => {
        this._list = normalizeCollection(data, (item) => item.id, normalizeProduct);
        this._meta = Meta.success;
      });
    } catch (error) {
      this._list = getInitialCollectionModel();
      this._meta = Meta.error;
    }
  }

  destroy(): void {
    this._qpReaction();
  }

  private readonly _qpReaction = reaction(
    () => rootStore.query.getParam('search'),
    (search, aaa) => {
      console.log(search, aaa)
    }
  );
}
