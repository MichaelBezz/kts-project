import * as React from 'react';
import { APIRoute } from 'config/api-route';
import { api } from 'services/api';
import { TProducts } from 'types/product';
import Intro from './components/Intro';
import ProductList from './components/ProductList';
import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
  const [products, setProducts] = React.useState<TProducts>([]);

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await api.get<TProducts>(APIRoute.Products);
      setProducts(data);
    };

    getData();
  }, []);

  return(
    <div className={styles['main-page']}>
      <Intro className={styles['main-page__intro']} />
      <ProductList className={styles['main-page__products']} products={products} />
    </div>
  );
};

export default MainPage;
