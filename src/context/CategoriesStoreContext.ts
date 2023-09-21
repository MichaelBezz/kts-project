import * as React from 'react';
import CategoriesStore from 'store/CategoriesStore';

export const CategoriesStoreContext = React.createContext<CategoriesStore | null>(null);

export const useCategoriesStore = (): CategoriesStore => {
  const context = React.useContext(CategoriesStoreContext);

  if (context === null) {
    throw new Error('Check CategoriesStore');
  }

  return context;
};
