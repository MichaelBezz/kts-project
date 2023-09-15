import { CategoryApi, CategoryModel, getInitialCategoryModel, normalizeCategory } from './category';

export type ProductApi = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryApi;
  images: string[];
};

export type ProductModel = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryModel;
  images: string[];
};

export const getInitialProductModel = (): ProductModel => ({
  id: 0,
  title: '',
  price: 0,
  description: '',
  category: getInitialCategoryModel(),
  images: ['']
});

export const normalizeProduct = (from: ProductApi): ProductModel => ({
  id: from.id,
  title: from.title,
  price: from.price,
  description: from.description,
  category: normalizeCategory(from.category),
  images: from.images
});
