export interface IAuthData {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthRequest {
  email: string;
  password: string;
};

export interface IAuthRequestErrors {
  email: string;
  password: string;
};
