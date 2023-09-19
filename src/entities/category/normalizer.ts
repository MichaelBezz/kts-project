import { CategoryServer, ICategory } from 'entities/category';

export const normalizeCategory = (from: CategoryServer): ICategory => ({
  id: from.id,
  name: from.name,
  image: from.image
});
