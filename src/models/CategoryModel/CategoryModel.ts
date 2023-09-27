import { CategoryId, CategoryServer, ICategory, normalizeCategory } from 'models/CategoryModel';

export default class CategoryModel implements ICategory {
  readonly id: number;
  readonly name: string;
  readonly image: string;

  constructor({ id, name, image }: ICategory = {
    id: 0,
    name: '',
    image: '',
  }) {
    this.id = id;
    this.name = name;
    this.image = image;
  }

  static fromJson(from: CategoryServer): CategoryModel {
    return new CategoryModel(normalizeCategory(from));
  }

  static normalizeCategoryList(categories: CategoryServer[]) {
    return categories.reduce((acc, category) => ({
      ...acc,
      entities: {
        ...acc.entities,
        [category.id]: CategoryModel.fromJson(category),
      },
      keys: [...acc.keys, category.id],
    }), {
      entities: {} as Record<CategoryId, CategoryModel>,
      keys: [] as CategoryId[],
    });
  }
}
