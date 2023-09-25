import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export const AUTH_TOKEN = 'auth-token';

const BACKEND_URL = 'https://api.escuelajs.co/api/v1';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem(AUTH_TOKEN);

      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<{error: string}>) => {
      // const {response} = error;
      // if (response?.status === 401) {}
      return Promise.reject(error);
    }
  );

  return api;
};

export const api = createAPI();
