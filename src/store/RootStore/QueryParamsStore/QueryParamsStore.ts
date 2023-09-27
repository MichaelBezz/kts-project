import { makeObservable, observable, computed, action } from 'mobx';
import * as qs from 'qs';

export type QueryParam = undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[];

type PrivateFields = '_params';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = '';

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,

      pageParam: computed,
      searchParam: computed,
      filterParam: computed,

      setSearch: action.bound,
    });
  }

  get pageParam(): QueryParam {
    return this._params['page'];
  }

  get searchParam(): QueryParam {
    return this._params['search'];
  }

  get filterParam(): QueryParam {
    return this._params['category'];
  }

  getParam(key: string): QueryParam {
    return this._params[key];
  }

  setSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }
}
