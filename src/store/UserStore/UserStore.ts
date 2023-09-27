import { AxiosInstance } from 'axios';
import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { APIRoute } from 'config/api-route';
import ListModel from 'models/ListModel';
import UserModel, { UserServer } from 'models/UserModel';
import { api } from 'services/api';
import { ILocalStore } from 'store/hooks';
import { Meta } from 'utils/meta';

export interface IUserStore {
  getUsers: () => Promise<void>;
};

type PrivateFields =
  | '_userList'
  | '_meta';

export default class UserStore implements IUserStore, ILocalStore {
  private readonly _api: AxiosInstance = api;

  private _userList: ListModel<UserModel> = new ListModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<UserStore, PrivateFields>(this, {
      _userList: observable.ref,
      _meta: observable,

      users: computed,
      meta: computed,
      isLoading: computed,

      getUsers: action.bound,
    });
  }

  get users(): UserModel[] {
    return this._userList.items;
  }

  get meta(): Meta {
    return this._meta;
  }

  get isLoading(): boolean {
    return this._meta === Meta.loading;
  }

  async getUsers(): Promise<void> {
    if (this.isLoading) {
      return;
    }

    this._meta = Meta.loading;

    const { data } = await this._api.get<UserServer[]>(APIRoute.users);

    if (data) {
      runInAction(() => {
        this._userList = new ListModel<UserModel>(UserModel.normalizeUserList(data));
        this._meta = Meta.success;
      });
    } else {
      this._meta = Meta.error;
    }
  }

  destroy(): void {}
}
