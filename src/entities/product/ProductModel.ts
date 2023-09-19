import CategoryModel, { ICategory } from 'entities/category';
import { ProductServer, IProduct, normalizeProduct } from 'entities/product';

export default class ProductModel implements IProduct {
  readonly id: number;
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly category: ICategory;
  readonly images: string[];

  constructor(data: IProduct) {
    this.id = data.id;
    this.title = data.title;
    this.price = data.price;
    this.description = data.description;
    this.category = data.category;
    this.images = data.images;
  }

  static fromJson(from: ProductServer): ProductModel {
    return new ProductModel(normalizeProduct(from));
  }

  static getInitialProductModel(): ProductModel {
    return new ProductModel({
      id: 0,
      title: '',
      price: 0,
      description: '',
      category: CategoryModel.getInitialCategoryModel(),
      images: ['']
    });
  }
}
