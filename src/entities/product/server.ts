import { CategoryServer } from 'entities/category';

export type ProductServer = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryServer;
  images: string[];
};
