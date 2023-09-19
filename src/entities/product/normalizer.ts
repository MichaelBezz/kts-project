import { normalizeCategory } from 'entities/category';
import { ProductServer, IProduct } from 'entities/product';

export const normalizeProduct = (from: ProductServer): IProduct => ({
  id: from.id,
  title: from.title,
  price: from.price,
  description: from.description,
  category: normalizeCategory(from.category),
  images: from.images
});
