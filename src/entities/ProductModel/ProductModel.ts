import { makeObservable, observable, computed, action } from 'mobx';
import { ICategory } from 'entities/CategoryModel';
import { ProductServer, ProductId, IProduct, normalizeProduct } from 'entities/ProductModel';

type PrivateFields = '_cart';

export default class ProductModel implements IProduct {
  readonly id: ProductId;
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly category: ICategory;
  readonly images: string[];
  private _cart: number = 0;

  constructor({ id, title, price, description, category, images }: IProduct = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: { id: 0, name: '', image: '' },
    images: [''],
  }) {
    makeObservable<ProductModel, PrivateFields>(this, {
      _cart: observable,
      cart: computed,
      setCart: action.bound,
    });

    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.images = images;
  }

  get cart() {
    return this._cart;
  }

  setCart(count: number): void {
    this._cart = count;
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
