import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import CardList from 'components/CardList';
import Message from 'components/Message';
import Pagination from 'components/Pagination';
import Text from 'components/Text';
import Loader from 'components/loaders/Loader';
import { useProductsStore } from 'store/hooks';
import styles from './Catalog.module.scss';

export type CatalogProps = {
  className?: string;
};

const Catalog: React.FC<CatalogProps> = ({ className }) => {
  const productsStore = useProductsStore();

  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    productsStore.getProducts();
  }, [productsStore]);

  const handlePaginationChange = React.useCallback((page: number) => {
    window.scrollTo(0, 0);

    searchParams.set('page', `${page}`);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  return (
    <div className={cn(styles['catalog'], className)}>
      <div className={styles['catalog__header']}>
        <Text tag="h2" view="p-32">Total Product</Text>

        {productsStore.isLoading ? (
          <Loader size="s" />
        ) : (
          <Text tag="p" view="p-20" weight="bold" color="accent">
            {!!productsStore.productCount && productsStore.productCount}
          </Text>
        )}
      </div>

      {productsStore.isError && (
        <Message>Error. Try again.</Message>
      )}

      {(productsStore.isSuccess && !productsStore.products.length) && (
        <Message>Product not found.</Message>
      )}

      <CardList
        className={styles['catalog__cards']}
        products={productsStore.products}
        productLimit={productsStore.productLimit}
        isLoading={productsStore.isLoading}
      />

      <Pagination
        className={styles['catalog__pagination']}
        currentPage={Number(productsStore.pageParam)}
        totalCount={Number(productsStore.productCount)}
        pageSize={productsStore.productLimit}
        onPageChange={handlePaginationChange}
      />
    </div>
  );
};

export default observer(Catalog);
