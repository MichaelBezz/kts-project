import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import ProductsStore from 'store/ProductsStore';
import rootStore from 'store/RootStore';
import { useLocalStore } from 'store/hooks/useLocalStore';
import styles from './Search.module.scss';

export type SearchProps = {
  className?: string;
};

const Search: React.FC<SearchProps> = ({ className }) => {
  const searchParam = rootStore.query.getParam('search');
  const productsStore = useLocalStore(() => new ProductsStore());

  const [value, setValue] = React.useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    setValue(searchParam ? String(searchParam) : '');
  }, [searchParam]);

  const handelInputChange = React.useCallback((value: string) => {
    setValue(value);
  }, []);

  const handelFormSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value) {
      searchParams.set('search', value);
    } else {
      searchParams.delete('search');
    }

    searchParams.delete('page');
    setSearchParams(searchParams);
  }, [value, searchParams, setSearchParams]);

  return (
    <form
      className={cn(styles['search'], className)}
      action="#"
      method="post"
      onSubmit={handelFormSubmit}
    >
      <Input
        className={styles['search__input']}
        value={value}
        onChange={handelInputChange}
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
