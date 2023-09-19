import { makeObservable, observable, computed, action } from 'mobx';

export const CART_STORE_TOKEN = 'cart-store-token';

export interface ICartStore {
  getItemCount: (key: number) => number;
  plusItem: (key: number) => void;
  minusItem: (key: number) => void;
  deleteItem: (key: number) => void;
};

type CartItems = Map<number, number>;
type PrivateFields = '_items';

export default class CartStore implements ICartStore {
  private _items: CartItems = this.getItemsFromStore()
    ? new Map(JSON.parse(this.getItemsFromStore()))
    : new Map();

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _items: observable,

      items: computed,
      count: computed,

      plusItem: action.bound,
      minusItem: action.bound,
      deleteItem: action.bound,
    });
  }

  get items(): number[] {
    return Array.from(this._items.keys());
  }

  get count(): number {
    return this._items.size;
  }

  getItemCount(key: number): number {
    return this._items.get(key) ?? 0;
  }

  plusItem(key: number): void {
    const item = this._items.get(key);

    if (item) {
      this._items.set(key, item + 1);
    } else {
      this._items.set(key, 1);
    }

    this.saveItemsToStore(this._items);
  }

  minusItem(key: number): void {
    const item = this._items.get(key);

    if (item && item >= 2) {
      this._items.set(key, item - 1);
    } else {
      this._items.delete(key);
    }

    this.saveItemsToStore(this._items);
  }

  deleteItem(key: number): void {
    this._items.delete(key);

    this.saveItemsToStore(this._items);
  }

  getItemsFromStore(): string {
    return localStorage.getItem(CART_STORE_TOKEN) ?? '';
  }

  saveItemsToStore(items: CartItems): void {
    localStorage.setItem(CART_STORE_TOKEN, JSON.stringify(items));
  }
}
