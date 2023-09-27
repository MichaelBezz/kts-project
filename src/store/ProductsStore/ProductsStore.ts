import { AxiosInstance } from 'axios';
import { makeObservable, observable, computed, action, runInAction, reaction, IReactionDisposer } from 'mobx';
import { APIRoute } from 'config/api-route';
import ListModel from 'models/ListModel';
import ProductModel, { ProductServer } from 'models/ProductModel';
import { api } from 'services/api';
import rootStore from 'store/RootStore';
import { QueryParam } from 'store/RootStore/QueryParamsStore';
import { ILocalStore } from 'store/hooks';
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
  | '_productList'
  | '_productCount'
  | '_productLimit'
  | '_pageParam'
  | '_searchParam'
  | '_filterParam'
  | '_meta';

export default class ProductsStore implements IProductsStore, ILocalStore {
  private readonly _api: AxiosInstance = api;

  private _productList: ListModel<ProductModel> = new ListModel();

  private _productCount: number | null = null;
  private _productLimit: number = 9;
  private _pageParam: QueryParam = '1';
  private _searchParam: QueryParam = '';
  private _filterParam: QueryParam = '';

  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _productList: observable.ref,
      _productCount: observable,
      _productLimit: observable,
      _pageParam: observable,
      _searchParam: observable,
      _filterParam: observable,
      _meta: observable,

      products: computed,
      productCount: computed,
      productLimit: computed,
      pageParam: computed,
      meta: computed,
      isLoading: computed,
      isSuccess: computed,
      isError: computed,

      setProductLimit: action.bound,
      setPageParam: action.bound,
      setSearchParam: action.bound,
      setFilterParam: action.bound,
      getProductCount: action.bound,
      getProducts: action.bound,
    });
  }

  get products(): ProductModel[] {
    return this._productList.items;
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
    this._meta = Meta.loading;

    const { data } = await this._api<ProductServer[]>({
      url: APIRoute.products,
      params: {
        offset: 0,
        limit: 0,
        title: this._searchParam,
        categoryId: this._filterParam,
      }
    });

    if (data) {
      runInAction(() => {
        this._productCount = data.length;
        this._meta = Meta.success;
      });
    } else {
      this._meta = Meta.error;
    }
  }

  async getProducts(recalculateCount = false): Promise<void> {
    if (this.isLoading) {
      return;
    }

    this._meta = Meta.loading;

    const { data } = await this._api<ProductServer[]>({
      url: APIRoute.products,
      params: {
        offset: Number(this._pageParam) * this._productLimit - this._productLimit,
        limit: this._productLimit,
        title: this._searchParam,
        categoryId: this._filterParam
      }
    });

    if (data) {
      runInAction(() => {
        if (recalculateCount || this._productCount === null) {
          this.getProductCount();
        }

        this._productList = new ListModel<ProductModel>(ProductModel.normalizeProductList(data));
        this._meta = Meta.success;
      });
    } else {
      this._meta = Meta.error;
    }
  }

  destroy(): void {
    this._queryParamsReaction();
    this._queryPageReaction();
    this._querySearchReaction();
    this._queryFilterReaction();
  }

  private readonly _queryParamsReaction: IReactionDisposer = reaction(
    () => ({
      pageParam: rootStore.query.pageParam,
      searchParam: rootStore.query.searchParam,
      filterParam: rootStore.query.filterParam
    }),
    (params: Record<string, QueryParam>) => {
      this.setPageParam(params.pageParam || '1');
      this.setSearchParam(params.searchParam || '');
      this.setFilterParam(params.filterParam || '');

      const isParamsEmpty = Object.values(params)
        .every((param) => param === undefined);

      if (isParamsEmpty) {
        this.getProducts(true)
      }

    }
  );

  private readonly _queryPageReaction: IReactionDisposer = reaction(
    () => rootStore.query.pageParam,
    (param) => {param && this.getProducts()}
  );

  private readonly _querySearchReaction: IReactionDisposer = reaction(
    () => rootStore.query.searchParam,
    () => {this.getProducts(true)}
  );

  private readonly _queryFilterReaction: IReactionDisposer = reaction(
    () => rootStore.query.filterParam,
    () => {this.getProducts(true)}
  );
}
