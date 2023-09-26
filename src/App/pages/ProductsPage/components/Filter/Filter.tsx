import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import Dropdown, { Option } from 'components/Dropdown';
import CategoriesStore from 'store/CategoriesStore';
import { useQueryParamsStore } from 'store/RootStore/hooks';
import { useLocalStore, useProductsStore } from 'store/hooks';

export type FilterProps = {
  className?: string;
};

const Filter: React.FC<FilterProps> = ({ className }) => {
  const queryParamsStore = useQueryParamsStore();
  const productsStore = useProductsStore();
  const categoriesStore = useLocalStore(() => new CategoriesStore());

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = queryParamsStore.getParam('category');

  React.useEffect(() => {
    categoriesStore.getCategories();
  }, [categoriesStore]);

  const options: Option[] = React.useMemo(() => {
    return categoriesStore.categories.map(({id, name}) => ({
      key: `${id}`,
      value: name
    }));
  }, [categoriesStore.categories]);

  const getTitle = React.useCallback((option: Option | null): string => {
    return option === null ? 'Filter' : option.value;
  }, []);

  const handleDropdownChange = React.useCallback((option: Option | null) => {
    if (option) {
      searchParams.set('category', option.key);
      searchParams.set('page', '1');
    } else {
      searchParams.delete('category');
    }

    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  return (
    <div className={className}>
      <Dropdown
        options={options}
        valueId={String(categoryParam) ?? null}
        onChange={handleDropdownChange}
        getTitle={getTitle}
        disabled={productsStore.isLoading || categoriesStore.isLoading}
      />
    </div>
  );
};

export default observer(Filter);
