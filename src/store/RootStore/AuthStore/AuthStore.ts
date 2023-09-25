import { AxiosInstance, AxiosResponse } from 'axios';
import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { APIRoute } from 'config/api-route';
import { AuthDataServer, IAuthRequest, normalizeAuthData } from 'models/AuthMode';
import UserModel, { UserServer } from 'models/UserModel';
import { AUTH_TOKEN, api } from 'services/api';
import { AuthorizationStatus } from 'utils/auth';
import { Meta } from 'utils/meta';

export interface IAuthStore {
  check: () => Promise<void>;
  login: (data: IAuthRequest) => Promise<void>;
  logout: () => void;
};

type PrivateFields = '_authStatus' | '_profile' | '_meta';

export default class AuthStore implements IAuthStore {
  private readonly _api: AxiosInstance = api;

  private _authStatus: AuthorizationStatus = AuthorizationStatus.unknown;
  private _profile: UserModel = new UserModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<AuthStore, PrivateFields>(this, {
      _authStatus: observable,
      _profile: observable,
      _meta: observable,

      authStatus: computed,
      isAuth: computed,
      profile: computed,
      meta: computed,
      isLoading: computed,

      check: action.bound,
      login: action.bound,
    });
  }

  get authStatus(): AuthorizationStatus {
    return this._authStatus;
  }

  get isAuth(): boolean {
    return this._authStatus === AuthorizationStatus.authorized;
  }

  get profile(): UserModel {
    return this._profile;
  }

  get meta(): Meta {
    return this._meta;
  }

  get isLoading(): boolean {
    return this._meta === Meta.loading;
  }

  async check(): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }

    this._authStatus = AuthorizationStatus.unknown;
    this._meta = Meta.loading;

    const { data } = await this._api.get<UserServer>(APIRoute.profile);

    if (data) {
      runInAction(() => {
        this._profile = UserModel.fromJson(data);
        this._authStatus = AuthorizationStatus.authorized;
        this._meta = Meta.success;
      });
    } else {
      this._authStatus = AuthorizationStatus.noAuthorized;
      this._meta = Meta.error;
    }
  }

  async login(authData: IAuthRequest): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }

    this._authStatus = AuthorizationStatus.unknown;
    this._meta = Meta.loading;

    const { data } = await this._api.post<IAuthRequest, AxiosResponse<AuthDataServer>>(APIRoute.login, authData);

    if (data) {
      runInAction(() => {
        const token = normalizeAuthData(data);
        localStorage.setItem(AUTH_TOKEN, token.accessToken);

        this._authStatus = AuthorizationStatus.authorized;
        this._meta = Meta.success;
      });
    } else {
      this._authStatus = AuthorizationStatus.noAuthorized;
      this._meta = Meta.error;
    }
  }

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN);
  }
}
