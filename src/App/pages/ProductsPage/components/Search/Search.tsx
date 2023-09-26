import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import Input from 'components/Input';
import Button from 'components/buttons/Button';
import { useQueryParamsStore } from 'store/RootStore/hooks';
import { useProductsStore } from 'store/hooks';
import styles from './Search.module.scss';

export type SearchProps = {
  className?: string;
};

const Search: React.FC<SearchProps> = ({ className }) => {
  const queryParamsStore = useQueryParamsStore();
  const productsStore = useProductsStore();

  const [value, setValue] = React.useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParam = queryParamsStore.getParam('search');

  React.useEffect(() => {
    setValue(searchParam ? String(searchParam) : '');
  }, [searchParam]);

  const handleInputChange = React.useCallback((value: string) => {
    setValue(value);
  }, []);

  const handleFormSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value) {
      searchParams.set('search', value);
      searchParams.set('page', '1');
    } else {
      searchParams.delete('search');
    }

    setSearchParams(searchParams);
  }, [value, searchParams, setSearchParams]);

  return (
    <form
      className={cn(styles['search'], className)}
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <Input
        className={styles['search__input']}
        value={value}
        onChange={handleInputChange}
        placeholder="Search product"
        disabled={productsStore.isLoading}
      />

      <Button
        className={styles['search__button']}
        buttonStyle="primary"
        type="submit"
        disabled={productsStore.isLoading}
      >
        Find now
      </Button>
    </form>
  );
};

export default observer(Search);
