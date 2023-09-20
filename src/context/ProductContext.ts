import * as React from 'react';
import ProductStore from 'store/ProductStore';

export const ProductContext = React.createContext<ProductStore | null>(null);

export const useProductStore = (): ProductStore => {
  const context = React.useContext(ProductContext);

  if (context === null) {
    throw new Error('Check ProductStore');
  }

  return context;
};
