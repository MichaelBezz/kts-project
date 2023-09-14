import { AxiosInstance } from 'axios';
import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { APIRoute } from 'config/api-route';
import { ILocalStore } from 'hooks/useLocalStore';
import { api } from 'services/api';
import { TProduct } from 'types/product';
import { Meta } from 'utils/meta';

type PrivateFields = '_list' | '_meta';

export default class ProductsStor implements ILocalStore {
  private readonly _api: AxiosInstance = api;

  private _list: TProduct[] = [];
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

  get list(): TProduct[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  get isLoading(): boolean {
    return this._meta === Meta.loading;
  }

  async getList(offset = 0, limit = 0): Promise<void> {
    this._meta = Meta.loading;
    this._list = [];

    const { data } = await this._api.get<TProduct[]>(
      `${APIRoute.products}?offset=${offset}&limit=${limit}`
    );

    runInAction(() => {
      if (data) {
        this._meta = Meta.success;
        this._list = data;
        return;
      }

      this._meta = Meta.error;
    });
  }

  destroy(): void {}
}
