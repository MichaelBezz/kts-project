import * as React from 'react';
import Loader from 'components/Loader';
import Text from 'components/Text';
import { APIRoute } from 'config/api-route';
import { api } from 'services/api';
import { TProducts } from 'types/product';
import CardList from './components/CardList';
import Filter from './components/Filter';
import Search from './components/Search';
import styles from './ProductsPage.module.scss';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = React.useState<TProducts>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await api.get<TProducts>(APIRoute.Products);
      setProducts(data);
      setIsLoading(false);
    };

    getData();

    return () => {
      setIsLoading(true);
    };
  }, []);

  if (isLoading) {
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
          products={products}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
