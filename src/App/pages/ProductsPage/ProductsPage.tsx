import { observer } from 'mobx-react-lite';
import * as React from 'react';
import CardList from 'components/CardList';
import Loader from 'components/Loader';
import Pagination from 'components/Pagination';
import Text from 'components/Text';
import { useLocalStore } from 'hooks/useLocalStore';
import { fetchProducts } from 'services/api';
import ProductsStor from 'store/ProductsStor';
import Filter from './components/Filter';
import Search from './components/Search';
import styles from './ProductsPage.module.scss';

const CARD_PER_PAGE = 9;

const ProductsPage: React.FC = () => {
  const productsStore = useLocalStore(() => new ProductsStor());

  const [productCount, setProductCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      setProductCount(data.length);
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    const offset = currentPage * CARD_PER_PAGE - CARD_PER_PAGE;
    productsStore.getList(offset, CARD_PER_PAGE);
  }, [productsStore, currentPage]);

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

        <Search className={styles['products-page__search']} />
        <Filter className={styles['products-page__filter']} />

        <CardList
          className={styles['products-page__cards']}
          title={'Total Product'}
          products={productsStore.list}
          productCount={productCount}
          isLoading={productsStore.isLoading}
          loaderCount={CARD_PER_PAGE}
        />

        <Pagination
          className={styles['products-page__pagination']}
          currentPage={currentPage}
          totalCount={productCount}
          pageSize={CARD_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default observer(ProductsPage);
