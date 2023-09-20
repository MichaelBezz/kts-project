import * as React from 'react';
import CategoriesStore from 'store/CategoriesStore';

export const CategoriesContext = React.createContext<CategoriesStore | null>(null);

export const useCategoriesStore = (): CategoriesStore => {
  const context = React.useContext(CategoriesContext);

  if (context === null) {
    throw new Error('Check CategoriesStore');
  }

  return context;
};
