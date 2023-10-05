import { ICategory } from 'models/CategoryModel';

export type ProductId = number;

export interface IProduct {
  id: ProductId;
  title: string;
  price: number;
  description: string;
  category: ICategory;
  images: string[];
};

export type ProductOrder = {
  id: string;
  date: string;
  discount: number;
  total: number;
};
