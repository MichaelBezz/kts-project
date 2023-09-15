import { AxiosInstance } from 'axios';
import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { APIRoute } from 'config/api-route';
import { api } from 'services/api';
import { ILocalStore } from 'store/hooks/useLocalStore';
import { CategoryApi, CategoryModel, normalizeCategory } from 'store/models/product';
import { CollectionModel, getInitialCollectionModel, normalizeCollection, linearizeCollection } from 'store/models/shared';
import { Meta } from 'utils/meta';

export interface ICategoriesStore {
  getCategories: () => void;
}

type PrivateFields = '_categories' | '_meta';

export default class CategoriesStore implements ICategoriesStore, ILocalStore {
  private readonly _api: AxiosInstance = api;

  private _categories: CollectionModel<number, CategoryModel> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _categories: observable.ref,
      _meta: observable,
      categories: computed,
      meta: computed,
      isLoading: computed,
      getCategories: action.bound
    });
  }

  get categories(): CategoryModel[] {
    return linearizeCollection(this._categories);
  }

  get meta(): Meta {
    return this._meta;
  }

  get isLoading(): boolean {
    return this._meta === Meta.loading;
  }

  async getCategories(): Promise<void> {
    this._categories = getInitialCollectionModel();
    this._meta = Meta.loading;

    try {
      const { data } = await this._api.get<CategoryApi[]>(APIRoute.categories);

      runInAction(() => {
        this._categories = normalizeCollection(data, (category) => category.id, normalizeCategory);
        this._meta = Meta.success;
      });
    } catch (error) {
      this._categories = getInitialCollectionModel();
      this._meta = Meta.error;
    }
  }

  destroy(): void {}
}
