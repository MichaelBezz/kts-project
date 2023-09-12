import * as React from 'react';
import { useParams } from 'react-router-dom';
import CardList from 'components/CardList';
import GoBackButton from 'components/GoBackButton';
import Loader from 'components/Loader';
import { fetchProductById, fetchProductsByCategory } from 'services/api';
import { TProduct } from 'types/product';
import MainCard from './components/MainCard';
import styles from './ProductPage.module.scss';

const ProductPage: React.FC = () => {
  const [product, setProduct] = React.useState<TProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = React.useState<TProduct[] | null>(null);

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchData = async (id: string) => {
      const product = await fetchProductById(id);
      const relatedProducts = await fetchProductsByCategory(product.category.id, 0, 3);

      setProduct(product);
      setRelatedProducts(relatedProducts);
    };

    id && fetchData(id);
  }, [id]);

  if (product === null || relatedProducts === null) {
    return (<Loader size="general" />);
  }

  return (
    <div className={styles['product-page']}>
      <div className="container">
        <GoBackButton />

        <MainCard
          className={styles['product-page__product']}
          product={product}
        />

        <CardList
          className={styles['product-page__cards']}
          title={'Related Items'}
          products={relatedProducts}
        />
      </div>
    </div>
  );
};

export default ProductPage;
