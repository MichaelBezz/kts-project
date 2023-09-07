import * as React from 'react';
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

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await api.get<TProducts>(APIRoute.Products);
      setProducts(data);
    };

    getData();
  }, []);

  return(
    <div className={styles['products-page']}>
      <div className={"container"}>
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
      </div>

      <CardList products={products} />
    </div>
  );
};

export default ProductsPage;
