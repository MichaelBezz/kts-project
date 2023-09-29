import { AxiosInstance } from 'axios';
import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { APIRoute } from 'config/api-route';
import ListModel from 'models/ListModel';
import ProductModel, { ProductServer } from 'models/ProductModel';
import { api } from 'services/api';
import { Meta } from 'utils/meta';

export const CART_STORE_TOKEN = 'cart-store-token';
export const CART_ORDERS_TOKEN = 'cart-orders-token';

export interface ICartStore {
  hasItem: (key: number) => boolean;
  getItemCount: (keyParam: number) => number;
  setDiscount: (discount: string) => void;
  setDelivery: (discount: number) => void;
  setOrders: () => void;
  loadOrders: () => void;
  plus: (item: ProductModel) => void;
  minus: (item: ProductModel) => void;
  delete: (item: ProductModel) => void;
  saveData: () => void;
  loadData: () => Promise<void>;
  clearData: () => void;
};

type PrivateFields =
  | '_cartList'
  | '_productList'
  | '_discount'
  | '_delivery'
  | '_orders'
  | '_meta';

export default class CartStore implements ICartStore {
  private readonly _api: AxiosInstance = api;

  private _cartList: ListModel<ProductModel> = new ListModel();
  private _productList: ListModel<ProductModel> = new ListModel();
  private _discount: number = 0;
  private _delivery: number = 3;
  private _orders: Record<string, string>[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _cartList: observable,
      _productList: observable,
      _discount: observable,
      _delivery: observable,
      _orders: observable,
      _meta: observable,

      items: computed,
      count: computed,
      totalPrice: computed,
      totalDiscountPrice: computed,
      discount: computed,
      delivery: computed,
      orders: computed,
      meta: computed,
      isLoading: computed,

      setDiscount: action.bound,
      setDelivery: action.bound,
      setOrders: action.bound,
      loadOrders: action.bound,
      plus: action.bound,
      minus: action.bound,
      delete: action.bound,
      saveData: action.bound,
      loadData: action.bound,
      clearData: action.bound,
    });
  }

  get items(): ProductModel[] {
    return this._cartList.items;
  }

  get count(): number {
    return this._cartList.length;
  }

  get totalPrice(): number {
    return Math.round(this._cartList.items.reduce(
      (acc, item) => acc + (item.price * item.cartCount), 0
    ));
  }

  get totalDiscountPrice(): number {
    return Math.round(this._cartList.items.reduce(
      (acc, item) => acc + (item.discountPrice * item.cartCount), 0
    ));
  }

  get discount(): number {
    return this._discount;
  }

  get delivery(): number {
    return this._delivery;
  }

  get orders(): Record<string, string>[] {
    return this._orders;
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
    return this._cartList.getEntity(key).cartCount;
  }

  setDiscount(discount: string): void {
    const parsedDiscount = parseInt(discount, 10);
    const value = Number.isNaN(parsedDiscount) ? 0 : parsedDiscount;

    this._discount = value;

    if (value > 0) {
      this.setDelivery(0);
    } else {
      this.setDelivery(3);
    }

    this._cartList.items.forEach(
      (item) => item.setDiscountPrice(value)
    );
  }

  setDelivery(delivery: number): void {
    this._delivery = delivery;
  }

  setOrders(): void {
    this._orders.push({
      id: String(Date.now()).slice(-5),
      total: String(this.totalDiscountPrice + this.delivery)
    });

    localStorage.setItem(CART_ORDERS_TOKEN, JSON.stringify(this._orders));
  }

  loadOrders(): void {
    const localData = localStorage.getItem(CART_ORDERS_TOKEN);

    if (!localData) {
      return;
    }

    this._orders = JSON.parse(localData);
  }

  plus(item: ProductModel): void {
    if (this.hasItem(item.id)) {
      const entity = this._cartList.getEntity(item.id);
      entity.setCartCount(entity.cartCount + 1);
    } else {
      item.setCartCount(1);
      item.setDiscountPrice(this._discount);
      this._cartList.addEntity({entity: item, key: item.id});
    }

    this.saveData();
  }

  minus(item: ProductModel): void {
    const entity = this._cartList.getEntity(item.id);

    if (entity.cartCount >= 2) {
      entity.setCartCount(entity.cartCount - 1);
    } else {
      this._cartList.deleteEntity(item.id);
    }

    if (!this.count) {
      this.setDiscount('0');
      this.setDelivery(3);
    }

    this.saveData();
  }

  delete(item: ProductModel): void {
    this._cartList.deleteEntity(item.id);

    if (!this.count) {
      this.setDiscount('0');
      this.setDelivery(3);
    }

    this.saveData();
  }

  saveData(): void {
    const data = this._cartList.items.reduce((acc, item) => ({
      ...acc,
      [item.id]: item.cartCount
    }), {});

    localStorage.setItem(CART_STORE_TOKEN, JSON.stringify(data));
  }

  async loadData(): Promise<void> {
    if (this.isLoading) {
      return;
    }

    this._meta = Meta.loading;

    const localData = localStorage.getItem(CART_STORE_TOKEN);

    if (!localData) {
      this._meta = Meta.initial;
      return;
    }

    const { data } = await this._api<ProductServer[]>(APIRoute.products);

    if (data) {
      runInAction(() => {
        const parsedLocalData = JSON.parse(localData);
        this._productList = new ListModel<ProductModel>(ProductModel.normalizeProductList(data));

        this._productList.keys.forEach((key) => {
          if (key in parsedLocalData) {
            const entity = this._productList.getEntity(key);
            entity.setCartCount(parsedLocalData[key]);
            entity.setDiscountPrice(this._discount);

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

  clearData(): void {
    this._cartList.reset();
    localStorage.removeItem(CART_STORE_TOKEN);
  }
}
