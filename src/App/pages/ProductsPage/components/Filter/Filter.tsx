import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Dropdown, { Option } from 'components/Dropdown';
import CategoriesStore from 'store/CategoriesStore';
import { useLocalStore } from 'store/hooks/useLocalStore';

export type FilterProps = {
  className?: string;
};

const Filter: React.FC<FilterProps> = ({ className }) => {
  const categoriesStore = useLocalStore(() => new CategoriesStore());

  const [selectedOption, setSelectedOption] = React.useState<Option | null>(null);

  React.useEffect(() => {
    categoriesStore.getCategories();
  }, [categoriesStore]);

  const options: Option[] = React.useMemo(() => {
    return categoriesStore.categories.map(({id, name}) => ({
      key: `${id}`,
      value: name
    }));
  }, [categoriesStore.categories]);

  const getTitle = React.useCallback((value: Option | null): string => {
    return value === null ? 'Filter' : value.value;
  }, []);

  const handelDropdownChange = React.useCallback((option: Option | null) => {
    setSelectedOption(option);
    console.log(option)
  }, []);

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
