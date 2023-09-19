import { AxiosInstance } from 'axios';
import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { APIRoute } from 'config/api-route';
import CategoryModel, { CategoryServer, ICategory } from 'entities/CategoryModel';
import ListModel from 'entities/ListModel';
import { api } from 'services/api';
import { ILocalStore } from 'store/hooks/useLocalStore';
import { Meta } from 'utils/meta';

export interface ICategoriesStore {
  getCategories: () => Promise<void>;
};

type PrivateFields =
  | '_categoryList'
  | '_meta';

export default class CategoriesStore implements ICategoriesStore, ILocalStore {
  private readonly _api: AxiosInstance = api;

  private _categoryList: ListModel<ICategory> = new ListModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _categoryList: observable.ref,
      _meta: observable,

      categories: computed,
      meta: computed,
      isLoading: computed,

      getCategories: action.bound,
    });
  }

  get categories(): ICategory[] {
    return this._categoryList.items;
  }

  get meta(): Meta {
    return this._meta;
  }

  get isLoading(): boolean {
    return this._meta === Meta.loading;
  }

  async getCategories(): Promise<void> {
    this._meta = Meta.loading;

    try {
      const { data } = await this._api.get<CategoryServer[]>(`${APIRoute.categories}`);

      runInAction(() => {
        this._categoryList = new ListModel<ICategory>(CategoryModel.normalizeCategoryList(data));
        this._meta = Meta.success;
      });
    } catch (error) {
      this._meta = Meta.error;
    }
  }

  destroy(): void {}
}
