import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const BACKEND_URL = 'https://api.escuelajs.co/api/v1';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<{error: string}>) => {
      throw new Error(error.message);
    }
  );

  return api;
};

export const api = createAPI();
