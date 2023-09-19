import { CategoryServer, ICategory, normalizeCategory } from 'entities/CategoryModel';

export default class CategoryModel implements ICategory {
  readonly id: number;
  readonly name: string;
  readonly image: string;

  constructor(data: ICategory) {
    this.id = data.id;
    this.name = data.name;
    this.image = data.image;
  }

  static fromJson(from: CategoryServer): CategoryModel {
    return new CategoryModel(normalizeCategory(from));
  }

  static getInitialCategoryModel(): CategoryModel {
    return new CategoryModel({
      id: 0,
      name: '',
      image: '',
    });
  }
}
