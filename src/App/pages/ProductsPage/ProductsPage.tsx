import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import CardList from 'components/CardList';
import Loader from 'components/Loader';
import Pagination from 'components/Pagination';
import Text from 'components/Text';
import ProductsStore from 'store/ProductsStore';
import { useLocalStore } from 'store/hooks/useLocalStore';
// import Filter from './components/Filter';
// import Search from './components/Search';
import styles from './ProductsPage.module.scss';

const ProductsPage: React.FC = () => {
  const productsStore = useLocalStore(() => new ProductsStore());
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    productsStore.getProductCount();
    productsStore.getProducts();
  }, [productsStore]);

  const handelPaginationChange = React.useCallback((page: number) => {
    searchParams.set('page', `${page}`);
    setSearchParams(searchParams);

    productsStore.setCurrentPage(page);
  }, [searchParams, setSearchParams, productsStore]);

  if (productsStore.isLoading) {
    return (<Loader size="general" />);
  }

  return(
    <div className={styles['products-page']}>
      <div className="container">
        <div className={styles['products-page__header']}>
          <Text className={styles['products-page__title']} tag="h1" view="title" color="primary">
            Products
          </Text>

          <Text className={styles['products-page__description']} view="p-20" color="secondary">
            We&nbsp;display products based on&nbsp;the latest products we&nbsp;have,
            if&nbsp;you want to&nbsp;see our old products please enter the name of&nbsp;the item
          </Text>
        </div>

        {/* <Search className={styles['products-page__search']} /> */}
        {/* <Filter className={styles['products-page__filter']} /> */}

        <CardList
          className={styles['products-page__cards']}
          title={'Total Product'}
          products={productsStore.products}
          productCount={productsStore.productCount}
          isLoading={productsStore.isLoading}
          loaderCount={productsStore.productLimit}
        />

        <Pagination
          className={styles['products-page__pagination']}
          currentPage={productsStore.currentPage}
          totalCount={productsStore.productCount ?? 0}
          pageSize={productsStore.productLimit}
          onPageChange={handelPaginationChange}
        />
      </div>
    </div>
  );
};

export default observer(ProductsPage);
