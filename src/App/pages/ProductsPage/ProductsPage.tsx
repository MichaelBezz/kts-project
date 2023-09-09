import * as React from 'react';
import Loader from 'components/Loader';
import Pagination from 'components/Pagination';
import Text from 'components/Text';
import { fetchProducts } from 'services/api';
import { TProduct } from 'types/product';
import CardList from './components/CardList';
import Filter from './components/Filter';
import Search from './components/Search';
import styles from './ProductsPage.module.scss';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = React.useState<TProduct[] | null>(null);
  const [totalProduct, setTotalProduct] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      setTotalProduct(data.length);
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts(0, 9);
      setProducts(data);
    };

    fetchData();
  }, []);

  if (products === null) {
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
          totalProduct={totalProduct}
          products={products}
        />

        <Pagination
          className={styles['products-page__pagination']}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
