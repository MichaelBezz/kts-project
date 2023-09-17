import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import GoBackButton from 'components/GoBackButton';
import MainCardLoader from 'components/MainCardLoader';
import ProductStore from 'store/ProductStore';
import { useLocalStore } from 'store/hooks/useLocalStore';
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
    <div className={styles['product-page']}>
      <div className="container">
        <GoBackButton />

        {productStore.isLoading ? (
          <MainCardLoader />
        ) : (
          <MainCard
            className={styles['product-page__product']}
            product={productStore.product}
          />
        )}

        <RelatedCards
          className={styles['product-page__cards']}
          categoryId={productStore.product.category.id}
        />
      </div>
    </div>
  );
};

export default observer(ProductPage);
