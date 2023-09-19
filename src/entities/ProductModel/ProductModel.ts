import CategoryModel, { ICategory } from 'entities/CategoryModel';
import { ProductServer, ProductId, IProduct, normalizeProduct } from 'entities/ProductModel';

export default class ProductModel implements IProduct {
  readonly id: ProductId;
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
  /** DELL */
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

  static normalizeProductList(products: ProductServer[]) {
    return products.reduce((acc, product) => ({
      ...acc,
      entities: {
        ...acc.entities,
        [product.id]: ProductModel.fromJson(product),
      },
      keys: [...acc.keys, product.id],
    }), {
      entities: {} as Record<ProductId, ProductModel>,
      keys: [] as ProductId[],
    });
  }
}
