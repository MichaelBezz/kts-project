import * as React from 'react';
import { useLocation } from 'react-router-dom';
import rootStore from '../instance';

export const useQueryParamsStoreInit = (): void => {
  const { search } = useLocation();

  React.useEffect(() => {
    rootStore.query.setSearch(search);
  }, [search]);
};
