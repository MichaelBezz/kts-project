import { makeObservable, observable, computed, action } from 'mobx';
import { getToken, saveToken } from 'services/local-storage';

export const CART_STORE_TOKEN = 'cart-store-token';

export interface ICartStore {
  getItemCount: (key: number) => number;
  plusItem: (key: number) => void;
  minusItem: (key: number) => void;
  deleteItem: (key: number) => void;
};

type PrivateFields = '_items';

export default class CartStore implements ICartStore {
  private _items: Map<number, number> = getToken(CART_STORE_TOKEN)
    ? new Map(JSON.parse(getToken(CART_STORE_TOKEN)))
    : new Map();

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _items: observable,

      items: computed,
      count: computed,

      setItems: action.bound,
      plusItem: action.bound,
      minusItem: action.bound,
      deleteItem: action.bound
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

  setItems(items: Map<number, number>): void {
    this._items = items;
  }

  plusItem(key: number): void {
    const item = this._items.get(key);

    if (item) {
      this._items.set(key, item + 1);
    } else {
      this._items.set(key, 1);
    }

    saveToken(CART_STORE_TOKEN, JSON.stringify(this._items));
  }

  minusItem(key: number): void {
    const item = this._items.get(key);

    if (item && item >= 2) {
      this._items.set(key, item - 1);
    } else {
      this._items.delete(key);
    }

    saveToken(CART_STORE_TOKEN, JSON.stringify(this._items));
  }

  deleteItem(key: number): void {
    this._items.delete(key);

    saveToken(CART_STORE_TOKEN, JSON.stringify(this._items));
  }
}
