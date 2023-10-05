import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import UserModel from 'models/UserModel';
import rootStore from 'store/RootStore';

export const ACCESS_TOKEN = 'access-token';
const BACKEND_URL = 'https://api.escuelajs.co/api/v1';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({ baseURL: BACKEND_URL });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem(ACCESS_TOKEN);

      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<{error: string}>) => {
      const {response} = error;

      if (response?.status === 401) {
        rootStore.auth.setProfile(new UserModel());
        return;
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export const api = createAPI();
