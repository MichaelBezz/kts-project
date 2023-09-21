import { makeObservable, observable, computed, action, set, remove } from 'mobx';
import { IList } from './types';

type PrivateFields = '_keys' | '_entities';

export default class ListModel<T, K extends string | number = number> implements IList<T, K> {
  private _keys: K[];
  private _entities: Record<K, T>;

  constructor(
    { keys, entities }: { keys: K[]; entities: Record<K, T> } = {
      keys: [],
      entities: {} as Record<K, T>,
    }
  ) {
    makeObservable<ListModel<T, K>, PrivateFields>(this, {
      _keys: observable,
      _entities: observable,

      keys: computed,
      entities: computed,
      items: computed,
      length: computed,

      reset: action,
      addEntity: action,
      deleteEntity: action,
    });

    this._keys = keys;
    this._entities = entities;
  }

  get keys(): K[] {
    return this._keys;
  }

  get entities(): Record<K, T> {
    return this._entities;
  }

  get items(): T[] {
    return this._keys.reduce((acc: T[], id: K) => {
      const item = this._entities[id];

      return item ? [...acc, item] : acc;
    }, []);
  }

  get length(): number {
    return this.items.length;
  }

  getEntity = (keyParam: K): T => {
    return this._entities[keyParam];
  };

  hasKey = (keyParam: K): boolean => {
    return this._keys.includes(keyParam);
  };

  reset = (): void => {
    this._keys = [];
    this._entities = {} as Record<K, T>;
  };

  addEntity = (
    { entity, key, start = false }: { entity: T; key: K; start?: boolean }
  ): void => {
    set(this._entities, {[key]: entity});

    if (start) {
      this._keys.unshift(key);
    } else {
      this._keys.push(key);
    }
  };

  deleteEntity = (keyParam: K): void => {
    remove(this._entities, String(keyParam));
    this._keys = this._keys.filter((key) => key !== keyParam);
  };
}
