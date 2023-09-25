import { AxiosInstance } from 'axios';
import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { APIRoute } from 'config/api-route';
import ListModel from 'models/ListModel';
import ProductModel, { ProductServer } from 'models/ProductModel';
import { api } from 'services/api';
import { Meta } from 'utils/meta';

export const CART_STORE_TOKEN = 'cart-store-token';

export interface ICartStore {
  getItemCount: (keyParam: number) => number;
  plus: (item: ProductModel) => void;
  minus: (item: ProductModel) => void;
  delete: (item: ProductModel) => void;
  saveData: () => void;
  loadData: () => Promise<void>;
};

type PrivateFields = '_cartList' | '_productList' | '_meta';

export default class CartStore implements ICartStore {
  private readonly _api: AxiosInstance = api;

  private _cartList: ListModel<ProductModel> = new ListModel();
  private _productList: ListModel<ProductModel> = new ListModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _cartList: observable,
      _productList: observable,
      _meta: observable,

      items: computed,
      count: computed,
      meta: computed,
      isLoading: computed,

      plus: action.bound,
      minus: action.bound,
      delete: action.bound,
      saveData: action.bound,
      loadData: action.bound,
    });
  }

  get items(): ProductModel[] {
    return this._cartList.items;
  }

  get count(): number {
    return this._cartList.length;
  }

  get meta(): Meta {
    return this._meta;
  }

  get isLoading(): boolean {
    return this._meta === Meta.loading;
  }

  hasItem(key: number): boolean {
    return this._cartList.hasKey(key);
  }

  getItemCount(key: number): number {
    return this._cartList.getEntity(key).cart;
  }

  plus(item: ProductModel): void {
    const isListContain = this._cartList.hasKey(item.id);

    if (isListContain) {
      const entity = this._cartList.getEntity(item.id);
      entity.setCart(entity.cart + 1);
    } else {
      item.setCart(1);
      this._cartList.addEntity({entity: item, key: item.id});
    }

    this.saveData();
  }

  minus(item: ProductModel): void {
    const entity = this._cartList.getEntity(item.id);

    if (entity.cart >= 2) {
      entity.setCart(entity.cart - 1);
    } else {
      this._cartList.deleteEntity(item.id);
    }

    this.saveData();
  }

  delete(item: ProductModel): void {
    this._cartList.deleteEntity(item.id);
    this.saveData();
  }

  saveData(): void {
    const data = this._cartList.items.reduce((acc, item) => {
      return ({
        ...acc,
        [item.id]: item.cart
      });
    }, {});

    localStorage.setItem(CART_STORE_TOKEN, JSON.stringify(data));
  }

  async loadData(): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;

    const { data } = await this._api<ProductServer[]>(APIRoute.products);

    if (data) {
      runInAction(() => {
        const localData = JSON.parse(localStorage.getItem(CART_STORE_TOKEN) ?? ' ');
        this._productList = new ListModel<ProductModel>(ProductModel.normalizeProductList(data));

        this._productList.keys.forEach((key) => {
          if (key in localData) {
            const entity = this._productList.getEntity(key);
            entity.setCart(localData[key]);

            this._cartList.addEntity({entity, key});
          }
        });

        this._productList.reset();
        this._meta = Meta.success;
      });
    } else {
      this._meta = Meta.error;
    }
  }
}
