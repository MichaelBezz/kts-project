import { makeObservable, observable, computed, action } from 'mobx';
import { ICategory } from 'models/CategoryModel';
import { ProductServer, ProductId, IProduct, normalizeProduct } from 'models/ProductModel';

type PrivateFields = '_cartCount' | '_discountPrice';

export default class ProductModel implements IProduct {
  readonly id: ProductId;
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly category: ICategory;
  readonly images: string[];
  private _cartCount: number = 0;
  private _discountPrice: number = 0;

  constructor({ id, title, price, description, category, images }: IProduct = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: { id: 0, name: '', image: '' },
    images: [''],
  }) {
    makeObservable<ProductModel, PrivateFields>(this, {
      _cartCount: observable,
      _discountPrice: observable,

      cartCount: computed,
      discountPrice: computed,

      setCartCount: action.bound,
      setDiscountPrice: action.bound,
    });

    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.images = images;
  }

  get cartCount(): number {
    return this._cartCount;
  }

  get discountPrice(): number {
    return this._discountPrice;
  }

  setCartCount(count: number): void {
    this._cartCount = count;
  }

  setDiscountPrice(discount: number): void {
    this._discountPrice = this.price - (this.price * (discount / 100));
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
