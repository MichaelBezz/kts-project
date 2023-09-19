import { AxiosInstance } from 'axios';
import { makeObservable, observable, computed, action, runInAction, reaction, IReactionDisposer } from 'mobx';
import { APIRoute } from 'config/api-route';
import ProductModel, { ProductServer, IProduct } from 'entities/ProductModel';
import { api } from 'services/api';
import rootStore from 'store/RootStore';
import { QueryParam } from 'store/RootStore/QueryParamsStore';
import { ILocalStore } from 'store/hooks/useLocalStore';
import { CollectionModel, getInitialCollectionModel, normalizeCollection, linearizeCollection } from 'store/models/shared';
import { Meta } from 'utils/meta';

export interface IProductsStore {
  setProductLimit: (limit: number) => void;
  setPageParam: (param: QueryParam) => void;
  setSearchParam: (param: QueryParam) => void;
  setFilterParam: (param: QueryParam) => void;
  getProductCount: () => Promise<void>;
  getProducts: (recalculateCount: boolean) => Promise<void>;
};

type PrivateFields =
  | '_products'
  | '_productCount'
  | '_productLimit'
  | '_pageParam'
  | '_searchParam'
  | '_filterParam'
  | '_meta';

export default class ProductsStore implements IProductsStore, ILocalStore {
  private readonly _api: AxiosInstance = api;

  private _products: CollectionModel<number, IProduct> = getInitialCollectionModel();

  private _productCount: number | null = null;
  private _productLimit: number = 9;
  private _pageParam: QueryParam = rootStore.query.getParam('page') ?? '1';
  private _searchParam: QueryParam = rootStore.query.getParam('search') ?? '';
  private _filterParam: QueryParam = rootStore.query.getParam('category') ?? '';

  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _products: observable.ref,
      products: computed,

      _productCount: observable,
      productCount:  computed,

      _productLimit: observable,
      productLimit: computed,

      _pageParam: observable,
      pageParam: computed,

      _searchParam: observable,
      _filterParam: observable,

      _meta: observable,
      meta: computed,

      isLoading: computed,
      isSuccess: computed,
      isError: computed,

      setProductLimit: action.bound,
      setPageParam: action.bound,
      setSearchParam: action.bound,
      setFilterParam: action.bound,
      getProductCount: action.bound,
      getProducts: action.bound
    });
  }

  get products(): IProduct[] {
    return linearizeCollection(this._products);
  }

  get productCount(): number | null {
    return this._productCount;
  }

  get productLimit(): number {
    return this._productLimit;
  }

  get pageParam(): QueryParam {
    return this._pageParam;
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

  setPageParam(param: QueryParam): void {
    this._pageParam = param;
  }

  setSearchParam(param: QueryParam): void {
    this._searchParam = param;
  }

  setFilterParam(param: QueryParam): void {
    this._filterParam = param;
  };

  async getProductCount(): Promise<void> {
    this._productCount = null;
    this._meta = Meta.loading;

    try {
      const { data } = await this._api<ProductServer[]>({
        url: APIRoute.products,
        params: {
          offset: 0,
          limit: 0,
          title: this._searchParam,
          categoryId: this._filterParam
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

  async getProducts(recalculateCount = false): Promise<void> {
    this._products = getInitialCollectionModel();
    this._meta = Meta.loading;

    try {
      const { data } = await this._api<ProductServer[]>({
        url: APIRoute.products,
        params: {
          offset: Number(this._pageParam) * this._productLimit - this._productLimit,
          limit: this._productLimit,
          title: this._searchParam,
          categoryId: this._filterParam
        }
      });

      runInAction(() => {
        if (recalculateCount || this._productCount === null) {
          this.getProductCount();
        }

        const items = data.map(ProductModel.fromJson);
        this._products = normalizeCollection(items, (item) => item.id);
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
    this._queryCategoryReaction();
  }

  private readonly _queryPageReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('page'),
    (page) => {
      if (page) {
        this.setPageParam(page);
        this.getProducts();
      } else {
        this.setPageParam('1');
        this.getProducts();
      }
    }
  );

  private readonly _querySearchReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('search'),
    (search) => {
      this.setSearchParam(search);
      this.setPageParam('1');
      this.getProducts(true);
    }
  );

  private readonly _queryCategoryReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('category'),
    (category) => {
      this.setFilterParam(category);
      this.setPageParam('1');
      this.getProducts(true);
    }
  );
}
