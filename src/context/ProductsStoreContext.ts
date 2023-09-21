import * as React from 'react';
import ProductsStore from 'store/ProductsStore';

export const ProductsStoreContext = React.createContext<ProductsStore | null>(null);

export const useProductsStore = (): ProductsStore => {
  const context = React.useContext(ProductsStoreContext);

  if (context === null) {
    throw new Error('Check ProductsStore');
  }

  return context;
};
