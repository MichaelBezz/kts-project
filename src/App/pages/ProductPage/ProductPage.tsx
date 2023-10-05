import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import Message from 'components/Message';
import GoBackButton from 'components/buttons/GoBackButton';
import ProductStore from 'store/ProductStore';
import { ProductStoreContext, useLocalStore } from 'store/hooks';
import MainCard from './components/MainCard';
import RelatedCards from './components/RelatedCards';
import styles from './ProductPage.module.scss';

const ProductPage: React.FC = () => {
  const productStore = useLocalStore(() => new ProductStore());

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    productStore.getProduct(String(id));
  }, [id, productStore]);

  return (
    <ProductStoreContext.Provider value={productStore}>
      <div className={styles['product-page']}>
        <div className="container">
          <GoBackButton />

          {productStore.isError && (
            <Message>Error. Try again.</Message>
          )}

          {(productStore.isSuccess && !productStore.product) && (
            <Message>Product not found.</Message>
          )}

          <MainCard className={styles['product-page__product']} />
          <RelatedCards className={styles['product-page__cards']} />
        </div>
      </div>
    </ProductStoreContext.Provider>
  );
};

export default observer(ProductPage);
