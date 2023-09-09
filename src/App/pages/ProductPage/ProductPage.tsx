import * as React from 'react';
import { useParams } from 'react-router-dom';
import GoBackButton from 'components/GoBackButton';
import Loader from 'components/Loader';
import { fetchProductById, fetchProductsByCategory } from 'services/api';
import { TProduct } from 'types/product';
import MainCard from './components/MainCard';
import RelatedCards from './components/RelatedCards';
import styles from './ProductPage.module.scss';

const ProductPage: React.FC = () => {
  const [product, setProduct] = React.useState<TProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = React.useState<TProduct[] | null>(null);

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchData = async (id: string) => {
      const data = await fetchProductById(id);
      setProduct(data);
    };

    id && fetchData(id);
  }, [id]);

  React.useEffect(() => {
    const fetchData = async (id: number) => {
      const data = await fetchProductsByCategory(id, 0, 3);
      setRelatedProducts(data);
    };

    product && fetchData(product.category.id);
  }, [product]);

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

        <RelatedCards
          className={styles['product-page__cards']}
          products={relatedProducts}
        />
      </div>
    </div>
  );
};

export default ProductPage;
