import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import Dropdown, { Option } from 'components/Dropdown';
import CategoriesStore from 'store/CategoriesStore';
// import rootStore from 'store/RootStore';
import { useLocalStore } from 'store/hooks/useLocalStore';
import { transformCategoryToOption } from 'store/models/product';

export type FilterProps = {
  className?: string;
};

const Filter: React.FC<FilterProps> = ({ className }) => {
  // const categoryParam = rootStore.query.getParam('category');
  const categoriesStore = useLocalStore(() => new CategoriesStore());

  const [selectedOption, setSelectedOption] = React.useState<Option | null>(null);
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
    setSelectedOption(option);

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
        value={selectedOption}
        onChange={handelDropdownChange}
        getTitle={getTitle}
        disabled={categoriesStore.isLoading}
      />
    </div>
  );
};

export default observer(Filter);
