import { ICategory } from 'entities/CategoryModel';
import { ProductServer, ProductId, IProduct, normalizeProduct } from 'entities/ProductModel';

export default class ProductModel implements IProduct {
  readonly id: ProductId;
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly category: ICategory;
  readonly images: string[];

  constructor({ id, title, price, description, category, images }: IProduct = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: { id: 0, name: '', image: '' },
    images: [''],
  }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.images = images;
  }

  static fromJson(from: ProductServer): ProductModel {
    return new ProductModel(normalizeProduct(from));
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
