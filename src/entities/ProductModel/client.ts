import { ICategory } from 'entities/CategoryModel';

export type ProductId = number;

export interface IProduct {
  id: ProductId;
  title: string;
  price: number;
  description: string;
  category: ICategory;
  images: string[];
};
