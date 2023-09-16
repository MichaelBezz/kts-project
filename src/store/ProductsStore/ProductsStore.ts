import { AxiosInstance } from 'axios';
import { makeObservable, observable, computed, action, runInAction, reaction, IReactionDisposer } from 'mobx';
import { APIRoute } from 'config/api-route';
import { api } from 'services/api';
import rootStore from 'store/RootStore';
import { QueryParam } from 'store/RootStore/QueryParamsStore';
import { ILocalStore } from 'store/hooks/useLocalStore';
import { ProductApi, ProductModel, normalizeProduct } from 'store/models/product';
import { CollectionModel, getInitialCollectionModel, normalizeCollection, linearizeCollection } from 'store/models/shared';
import { Meta } from 'utils/meta';

export interface IProductsStore {
  setProductLimit: (limit: number) => void;
  setCurrentPage: (page: number) => void;
  setCurrentSearch: (param: QueryParam) => void;
  // setCurrentCategory: (category: number) => void;
  getProductCount: () => Promise<void>;
  getProducts: () => Promise<void>;
};

type PrivateFields =
  | '_products'
  | '_productCount'
  | '_productLimit'
  | '_currentPage'
  | '_currentSearch'
  // | '_currentCategory'
  | '_meta';

export default class ProductsStore implements IProductsStore, ILocalStore {
  private readonly _api: AxiosInstance = api;

  private _products: CollectionModel<number, ProductModel> = getInitialCollectionModel();

  private _productCount: number | null = null;
  private _productLimit: number = 9;
  private _currentPage: number = rootStore.query.getParam('page')
    ? Number(rootStore.query.getParam('page'))
    : 1;
  private _currentSearch: QueryParam = rootStore.query.getParam('search');
  // private _currentCategory: number | null = rootStore.query.getParam('category')
  //   ? Number(rootStore.query.getParam('category'))
  //   : null;

  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _products: observable.ref,
      products: computed,

      _productCount: observable,
      productCount:  computed,

      _productLimit: observable,
      productLimit: computed,

      _currentPage: observable,
      currentPage: computed,

      _currentSearch: observable,

      // _currentCategory: observable,

      _meta: observable,
      meta: computed,

      isLoading: computed,
      isSuccess: computed,
      isError: computed,

      setProductLimit: action.bound,
      setCurrentPage: action.bound,
      setCurrentSearch: action.bound,
      // setCurrentCategory: action.bound,
      getProductCount: action.bound,
      getProducts: action.bound
    });
  }

  get products(): ProductModel[] {
    return linearizeCollection(this._products);
  }

  get productCount(): number | null {
    return this._productCount;
  }

  get productLimit(): number {
    return this._productLimit;
  }

  get currentPage(): number {
    return this._currentPage;
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

  setProductLimit(limit: number): void {
    this._productLimit = limit;
  }

  setCurrentPage(page: number): void {
    this._currentPage = page;
  }

  setCurrentSearch(param: QueryParam): void {
    this._currentSearch = param;
  }

  // setCurrentCategory(category: number): void {
  //   this._currentCategory = category;
  // };

  async getProductCount(): Promise<void> {
    this._productCount = null;
    this._meta = Meta.loading;

    try {
      const { data } = await this._api<ProductApi[]>({
        url: APIRoute.products,
        params: {
          offset: 0,
          limit: 0,
          title: this._currentSearch
        }
      });

      runInAction(() => {
        this._productCount = data.length;
        this._meta = Meta.success;
      });
    } catch (error) {
      this._productCount = null;
      this._meta = Meta.error;
    }
  }

  async getProducts(): Promise<void> {
    this._products = getInitialCollectionModel();
    this._meta = Meta.loading;

    try {
      const { data } = await this._api<ProductApi[]>({
        url: APIRoute.products,
        params: {
          offset: this._currentPage * this._productLimit - this._productLimit,
          limit: this._productLimit,
          title: this._currentSearch,
          // categoryId: this._currentCategory
        }
      });

      this.getProductCount();

      runInAction(() => {
        this._products = normalizeCollection(data, (item) => item.id, normalizeProduct);
        this._meta = Meta.success;
      });
    } catch (error) {
      this._products = getInitialCollectionModel();
      this._meta = Meta.error;
    }
  }

  destroy(): void {
    this._queryPageReaction();
    this._querySearchReaction();
    // this._queryCategoryReaction();
  }

  private readonly _queryPageReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('page'),
    (page) => {
      if (page) {
        this.setCurrentPage(+page);
        this.getProducts();
      }
    }
  );

  private readonly _querySearchReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('search'),
    (search) => {
      this.setCurrentSearch(search);
      this.setCurrentPage(1);
      this.getProducts();
    }
  );

  // private readonly _queryCategoryReaction: IReactionDisposer = reaction(
  //   () => rootStore.query.getParam('category'),
  //   (category) => {
  //     this._currentCategory = Number(category);
  //     this.setCurrentPage(1);
  //     this.getProductCount();
  //     this.getProducts();
  //   }
  // );
}
