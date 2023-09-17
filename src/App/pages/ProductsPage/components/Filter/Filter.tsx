import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import Dropdown, { Option } from 'components/Dropdown';
import CategoriesStore from 'store/CategoriesStore';
import ProductsStore from 'store/ProductsStore';
import rootStore from 'store/RootStore';
import { useLocalStore } from 'store/hooks/useLocalStore';
import { transformCategoryToOption } from 'store/models/product';

export type FilterProps = {
  className?: string;
};

const Filter: React.FC<FilterProps> = ({ className }) => {
  const categoryParam = rootStore.query.getParam('category');
  const productsStore = useLocalStore(() => new ProductsStore());
  const categoriesStore = useLocalStore(() => new CategoriesStore());

  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    categoriesStore.getCategories();
  }, [categoriesStore]);

  const options: Option[] = React.useMemo(() => {
    return categoriesStore.categories.map(transformCategoryToOption);
  }, [categoriesStore.categories]);

  const getTitle = React.useCallback((option: Option | null): string => {
    return option === null ? 'Filter' : option.value;
  }, []);

  const handelDropdownChange = React.useCallback((option: Option | null) => {
    if (option) {
      searchParams.set('category', option.key);
    } else {
      searchParams.delete('category');
    }

    searchParams.delete('page');
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  return (
    <div className={className}>
      <Dropdown
        options={options}
        valueId={String(categoryParam) ?? null}
        onChange={handelDropdownChange}
        getTitle={getTitle}
        disabled={categoriesStore.isLoading || productsStore.isLoading}
      />
    </div>
  );
};

export default observer(Filter);
