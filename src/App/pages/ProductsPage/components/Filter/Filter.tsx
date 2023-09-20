import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import Dropdown, { Option } from 'components/Dropdown';
import { useProductsStore } from 'context/ProductsContext';
import CategoriesStore from 'store/CategoriesStore';
import rootStore from 'store/RootStore';
import { useLocalStore } from 'store/hooks/useLocalStore';

export type FilterProps = {
  className?: string;
};

const Filter: React.FC<FilterProps> = ({ className }) => {
  const categoryParam = rootStore.query.getParam('category');
  const productsStore = useProductsStore();
  const categoriesStore = useLocalStore(() => new CategoriesStore());

  const [searchParams, setSearchParams] = useSearchParams();

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

  const handelDropdownChange = React.useCallback((option: Option | null) => {
    if (option) {
      setSearchParams({'category': option.key});
    } else {
      searchParams.delete('category');
    }

    searchParams.delete('page');
  }, [searchParams, setSearchParams]);

  return (
    <div className={className}>
      <Dropdown
        options={options}
        valueId={String(categoryParam) ?? null}
        onChange={handelDropdownChange}
        getTitle={getTitle}
        disabled={productsStore.isLoading || categoriesStore.isLoading}
      />
    </div>
  );
};

export default observer(Filter);
