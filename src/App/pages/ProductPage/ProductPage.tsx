import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import CardList from 'components/CardList';
import GoBackButton from 'components/GoBackButton';
import Loader from 'components/Loader';
import { fetchProductsByCategory } from 'services/api';
import ProductStore from 'store/ProductStore';
import { useLocalStore } from 'store/hooks/useLocalStore';
import { ProductModel } from 'store/models/product';
import MainCard from './components/MainCard';
import styles from './ProductPage.module.scss';

const ProductPage: React.FC = () => {
  const productStore = useLocalStore(() => new ProductStore());

  const [relatedProducts, setRelatedProducts] = React.useState<ProductModel[] | null>(null);

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    id && productStore.getProduct(id);

    // const fetchData = async (id: string) => {
    //   const relatedProducts = await fetchProductsByCategory(product.category.id, 0, 3);

    //   setRelatedProducts(relatedProducts);
    // };

    // id && fetchData(id);
  }, [id, productStore]);

  if (productStore.isLoading) {
    return (<Loader size="general" />);
  }

  return (
    <div className={styles['product-page']}>
      <div className="container">
        <GoBackButton />

        <MainCard
          className={styles['product-page__product']}
          product={productStore.product}
        />

        {/* <CardList
          className={styles['product-page__cards']}
          title={'Related Items'}
          products={relatedProducts}
        /> */}
      </div>
    </div>
  );
};

export default observer(ProductPage);
