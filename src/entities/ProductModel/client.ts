import { ICategory } from 'entities/CategoryModel';

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ICategory;
  images: string[];
};
