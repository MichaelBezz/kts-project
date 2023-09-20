import * as React from 'react';
import ProductsStore from 'store/ProductsStore';

export const ProductsContext = React.createContext<ProductsStore | null>(null);

export const useProductsStore = (): ProductsStore => {
  const context = React.useContext(ProductsContext);

  if (context === null) {
    throw new Error('Check ProductsStore');
  }

  return context;
};
