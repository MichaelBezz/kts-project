import { AxiosInstance, AxiosResponse } from 'axios';
import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { APIRoute } from 'config/api-route';
import { AuthResponseServer, IAuthRequest, normalizeAuthResponse } from 'models/AuthMode';
import UserModel, { UserServer } from 'models/UserModel';
import { ACCESS_TOKEN, api } from 'services/api';
import { AuthorizationStatus } from 'utils/auth';
import { Meta } from 'utils/meta';

export interface IAuthStore {
  setProfile: (profile: UserModel) => void;
  setMeta: (meta: Meta) => void;
  check: () => Promise<void>;
  login: (authRequest: IAuthRequest) => Promise<void>;
  logout: () => void;
};

type PrivateFields =
  | '_authStatus'
  | '_profile'
  | '_meta';

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
      isAuthUnknown: computed,
      profile: computed,
      meta: computed,
      isLoading: computed,
      isSuccess: computed,
      isError: computed,

      setProfile: action.bound,
      setMeta: action.bound,
      check: action.bound,
      login: action.bound,
      logout: action.bound,
    });
  }

  get authStatus(): AuthorizationStatus {
    return this._authStatus;
  }

  get isAuth(): boolean {
    return this._authStatus === AuthorizationStatus.authorized;
  }

  get isAuthUnknown(): boolean {
    return this._authStatus === AuthorizationStatus.unknown;
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

  get isSuccess(): boolean {
    return this._meta === Meta.success;
  }

  get isError(): boolean {
    return this._meta === Meta.error;
  }

  setProfile(profile: UserModel): void {
    this._profile = profile;
  }

  setMeta(meta: Meta): void {
    this._meta = meta;
  }

  async check(): Promise<void> {
    this._authStatus = AuthorizationStatus.unknown;

    const response = await this._api.get<UserServer>(APIRoute.profile);

    runInAction(() => {
      if (response?.data) {
        this._profile = UserModel.fromJson(response.data);
        this._authStatus = AuthorizationStatus.authorized;
      } else {
        this._authStatus = AuthorizationStatus.noAuthorized;
      }
    });
  }

  async login(authRequest: IAuthRequest): Promise<void> {
    if (this.isLoading) {
      return;
    }

    this._meta = Meta.loading;

    const response = await this._api.post<IAuthRequest, AxiosResponse<AuthResponseServer>>(APIRoute.login, authRequest);

    runInAction(() => {
      if (response?.data) {
        const token = normalizeAuthResponse(response.data);
        localStorage.setItem(ACCESS_TOKEN, token.accessToken);
        this._meta = Meta.success;
        this.check();
      } else {
        this._meta = Meta.error;
      }
    });
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN);
    this._authStatus = AuthorizationStatus.noAuthorized;
  }
}
