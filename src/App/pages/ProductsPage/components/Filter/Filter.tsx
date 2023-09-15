import { observer } from 'mobx-react-lite';
import * as React from 'react';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import CategoriesStore from 'store/CategoriesStore';
import { useLocalStore } from 'store/hooks/useLocalStore';

export type FilterProps = {
  className?: string;
};

const Filter: React.FC<FilterProps> = ({ className }) => {
  const categoriesStore = useLocalStore(() => new CategoriesStore());

  const [value, setValue] = React.useState<Option[]>([]);

  React.useEffect(() => {
    categoriesStore.getCategories();
  }, [categoriesStore]);

  const options: Option[] = React.useMemo(() => {
    return categoriesStore.categories.map(({id, name}) => ({
      key: `${id}`,
      value: name
    }));
  }, [categoriesStore.categories]);

  return (
    <div className={className}>
      <MultiDropdown
        options={options}
        value={value}
        onChange={setValue}
        getTitle={(values: Option[]) =>
          values.length === 0 ? 'Filter': values.map(({ value }) => value).join(', ')
        }
      />
    </div>
  );
};

export default observer(Filter);
