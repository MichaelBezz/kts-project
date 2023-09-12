import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { APIRoute } from 'config/api-route';
import { TCategory } from 'types/category';
import { TProduct } from 'types/product';

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

export const fetchProducts = async (offset = 0, limit = 0): Promise<TProduct[]> => {
  const { data } = await api.get<TProduct[]>(`${APIRoute.products}?offset=${offset}&limit=${limit}`);
  return data;
};

export const fetchProductById = async (id: string): Promise<TProduct> => {
  const { data } = await api.get<TProduct>(`${APIRoute.products}/${id}`);
  return data;
};

export const fetchProductsByCategory = async (id: number, offset = 0, limit = 0): Promise<TProduct[]> => {
  const { data } = await api.get<TProduct[]>(
    `${APIRoute.categories}/${id}${APIRoute.products}?offset=${offset}&limit=${limit}`
  );
  return data;
};

export const fetchCategories = async (): Promise<TCategory[]> => {
  const { data } = await api.get<TCategory[]>(APIRoute.categories);
  return data;
};
