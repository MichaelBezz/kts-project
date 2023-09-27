import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import Input from 'components/Input';
import Button from 'components/buttons/Button';
import CrossButton from 'components/buttons/CrossButton';
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
    } else {
      searchParams.delete('search');
    }

    searchParams.delete('page');
    setSearchParams(searchParams);
  }, [value, searchParams, setSearchParams]);

  const handleCrossButtonClick = React.useCallback(() => {
    const param = searchParams.get('search');
    setValue('');

    if (param !== null) {
      searchParams.delete('page');
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const slot = React.useMemo(() => {
    if (value) {
      return (
        <CrossButton
          onClick={handleCrossButtonClick}
          disabled={productsStore.isLoading}
        />
      );
    }
  }, [value, handleCrossButtonClick, productsStore.isLoading]);

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
        afterSlot={slot}
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
