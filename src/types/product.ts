import { TCategory } from 'types/category';

export type TProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: TCategory;
  images: string[];
};
