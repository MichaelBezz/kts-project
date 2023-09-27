import { normalizeCategory } from 'models/CategoryModel';
import { ProductServer, IProduct } from 'models/ProductModel';

export const normalizeProduct = (from: ProductServer): IProduct => ({
  id: from.id,
  title: from.title,
  price: from.price,
  description: from.description,
  category: normalizeCategory(from.category),
  images: from.images
});
