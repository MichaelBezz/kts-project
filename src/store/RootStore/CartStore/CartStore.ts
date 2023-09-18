import { makeObservable, observable, computed, action } from 'mobx';

export interface ICartStore {
  plusItem: (key: number) => void;
  minusItem: (key: number) => void;
  deleteItem: (key: number) => void;
};

type PrivateFields = '_items';

export default class CartStore implements ICartStore {
  private _items: Map<number, number> = new Map();

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _items: observable,

      count: computed,

      plusItem: action.bound,
      minusItem: action.bound,
      deleteItem: action.bound
    });
  }

  get count(): number {
    return this._items.size;
  }

  getItemCount(key: number): number | null {
    return this._items.get(key) ?? null;
  }

  plusItem(key: number): void {
    const item = this._items.get(key);

    if (item) {
      this._items.set(key, item + 1);
    } else {
      this._items.set(key, 1);
    }
  }

  minusItem(key: number): void {
    const item = this._items.get(key);

    if (item && item >= 2) {
      this._items.set(key, item - 1);
    } else {
      this._items.delete(key);
    }
  }

  deleteItem(key: number): void {
    this._items.delete(key);
  }
}
