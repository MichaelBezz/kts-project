import { AxiosInstance } from 'axios';
import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { APIRoute } from 'config/api-route';
import CategoryModel, { CategoryServer, ICategory } from 'entities/CategoryModel';
import { api } from 'services/api';
import { ILocalStore } from 'store/hooks/useLocalStore';
import { CollectionModel, getInitialCollectionModel, normalizeCollection, linearizeCollection } from 'store/models/shared';
import { Meta } from 'utils/meta';

export interface ICategoriesStore {
  getCategories: () => Promise<void>;
};

type PrivateFields =
  | '_categories'
  | '_meta';

export default class CategoriesStore implements ICategoriesStore, ILocalStore {
  private readonly _api: AxiosInstance = api;

  private _categories: CollectionModel<number, ICategory> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _categories: observable.ref,
      categories: computed,

      _meta: observable,
      meta: computed,

      isLoading: computed,

      getCategories: action.bound
    });
  }

  get categories(): ICategory[] {
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
      const { data } = await this._api.get<CategoryServer[]>(`${APIRoute.categories}`);

      runInAction(() => {
        const items = data.map(CategoryModel.fromJson);
        this._categories = normalizeCollection(items, (category) => category.id);
        this._meta = Meta.success;
      });
    } catch (error) {
      this._categories = getInitialCollectionModel();
      this._meta = Meta.error;
    }
  }

  destroy(): void {}
}
