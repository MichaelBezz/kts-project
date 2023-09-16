import cn from 'classnames';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import styles from './Search.module.scss';

export type SearchProps = {
  className?: string;
};

const Search: React.FC<SearchProps> = ({ className }) => {
  const [value, setValue] = React.useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handelSearchChange = React.useCallback((value: string) => {
    setValue(value);

    if (value) {
      searchParams.set('search', value);
    } else {
      searchParams.delete('search');
    }

    searchParams.delete('page');
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  return (
    <form
      className={cn(styles['search'], className)}
      action="#"
      method="post"
    >
      <Input
        className={styles['search__input']}
        value={value}
        onChange={handelSearchChange}
        placeholder="Search product"
      />

      <Button
        className={styles['search__button']}
        buttonStyle="primary"
        type="submit"
      >
        Find now
      </Button>
    </form>
  );
};

export default React.memo(Search);
