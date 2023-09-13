import * as React from 'react';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import { fetchCategories } from 'services/api';

export type FilterProps = {
  className?: string;
};

const Filter: React.FC<FilterProps> = ({ className }) => {
  const [options, setOptions] = React.useState<Option[]>([]);
  const [value, setValue] = React.useState<Option[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCategories();

      const dropdownOptions = data.map(({id, name}) => {
        return ({
          key: `${id}`,
          value: name
        });
      });

      setOptions(dropdownOptions);
    };

    fetchData();
  }, []);

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

export default Filter;
