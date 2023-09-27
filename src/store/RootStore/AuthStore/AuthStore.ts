// import { AxiosInstance, AxiosResponse } from 'axios';
import { makeObservable, observable, computed, action } from 'mobx';
// import { APIRoute } from 'config/api-route';
import {IAuthRequest,  } from 'models/AuthMode';
// import { AuthDataServer, IAuthRequest, IAuthRequestErrors, normalizeAuthData } from 'models/AuthMode';
// import UserModel, { UserServer } from 'models/UserModel';
// import { AUTH_TOKEN, api } from 'services/api';
// import { AuthorizationStatus } from 'utils/auth';
// import { Meta } from 'utils/meta';
// import { validate } from 'utils/validate';

export interface IAuthStore {
  // setAuthRequest: (request: Partial<IAuthRequest>) => void;
  // setAuthRequestErrors: (error: Partial<IAuthRequestErrors>) => void;
  // check: () => Promise<void>;
  // login: () => Promise<void>;
  // logout: () => void;
};

type PrivateFields =
  | '_authRequest'
  // | '_authRequestErrors'
  // | '_authStatus'
  // | '_profile'
  // | '_meta';

export default class AuthStore implements IAuthStore {
  // private readonly _api: AxiosInstance = api;

  private _authRequest: IAuthRequest = { email: '', password: '' };
  // private _authRequestErrors: IAuthRequestErrors = { email: '', password: '' };
  // private _authStatus: AuthorizationStatus = AuthorizationStatus.unknown;
  // private _profile: UserModel = new UserModel();
  // private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<AuthStore, PrivateFields>(this, {
      _authRequest: observable,
      // _authRequestErrors: observable,
      // _authStatus: observable,
      // _profile: observable,
      // _meta: observable,

      authRequest: computed,
      // authRequestErrors: computed,
      // authStatus: computed,
      // isAuth: computed,
      // profile: computed,
      // meta: computed,
      // isLoading: computed,

      setAuthRequest: action.bound,
      // setAuthRequestErrors: action.bound,
      // check: action.bound,
      // login: action.bound,
    });
  }

  get authRequest(): IAuthRequest {
    return this._authRequest;
  }

  // get authRequestErrors(): IAuthRequestErrors {
  //   return this._authRequestErrors;
  // }

  // get authStatus(): AuthorizationStatus {
  //   return this._authStatus;
  // }

  // get isAuth(): boolean {
  //   return this._authStatus === AuthorizationStatus.authorized;
  // }

  // get profile(): UserModel {
  //   return this._profile;
  // }

  // get meta(): Meta {
  //   return this._meta;
  // }

  // get isLoading(): boolean {
  //   return this._meta === Meta.loading;
  // }

  setAuthRequest(request: Partial<IAuthRequest>): void {
    this._authRequest = {
      ...this._authRequest,
      ...request
    };

    console.log(this._authRequest)
  }

  // setAuthRequestErrors(error: Partial<IAuthRequestErrors>): void {
  //   this._authRequestErrors = {
  //     ...this._authRequestErrors,
  //     ...error
  //   };
  // }

  // async check(): Promise<void> {
  //   if (this.isLoading) {
  //     return;
  //   }

  //   this._authStatus = AuthorizationStatus.unknown;
  //   this._meta = Meta.loading;

  //   const { data } = await this._api.get<UserServer>(APIRoute.profile);

  //   runInAction(() => {
  //     if (data) {
  //       this._profile = UserModel.fromJson(data);
  //       this._authStatus = AuthorizationStatus.authorized;
  //       this._meta = Meta.success;
  //     } else {
  //       this._authStatus = AuthorizationStatus.noAuthorized;
  //       this._meta = Meta.error;
  //     }
  //   });
  // }

  // async login(): Promise<void> {
  //   if (this.isLoading) {
  //     return;
  //   }

  //   this._authStatus = AuthorizationStatus.unknown;
  //   this._meta = Meta.loading;

  //   const isValid = validate(this.authRequest, this.setAuthRequestErrors);

  //   if (!isValid) {
  //     this._authStatus = AuthorizationStatus.noAuthorized;
  //     this._meta = Meta.initial;
  //     return;
  //   }

  //   const { data } = await this._api.post<IAuthRequest, AxiosResponse<AuthDataServer>>(APIRoute.login, this._authRequest);

  //   runInAction(() => {
  //     if (data) {
  //       this.setAuthRequest({ password: '' });

  //       const token = normalizeAuthData(data);
  //       localStorage.setItem(AUTH_TOKEN, token.accessToken);

  //       this._authStatus = AuthorizationStatus.authorized;
  //       this._meta = Meta.success;
  //     } else {
  //       this._authStatus = AuthorizationStatus.noAuthorized;
  //       this._meta = Meta.error;
  //     }
  //   });
  // }

  // logout(): void {
  //   localStorage.removeItem(AUTH_TOKEN);
  // }
}
