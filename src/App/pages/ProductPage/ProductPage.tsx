import * as React from 'react';
import { useParams } from 'react-router-dom';
import Button from 'components/Button';
import Loader from 'components/Loader';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import { APIRoute } from 'config/api-route';
import { api } from 'services/api';
import { TProduct } from 'types/product';
import MainCard from './components/MainCard';
import RelatedCards from './components/RelatedCards';
import styles from './ProductPage.module.scss';

const ProductPage: React.FC = () => {
  const [product, setProduct] = React.useState<TProduct>({} as TProduct);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const getData = async (id: string) => {
      const { data: mainProduct } = await api.get<TProduct>(`${APIRoute.Products}/${id}`);
      setProduct(mainProduct);

      setIsLoading(false);
    };

    if (id) {
      getData(id);
    }

    return () => {
      setIsLoading(true);
    };
  }, [id]);

  if (isLoading) {
    return (<Loader size="general" />);
  }

  return (
    <div className={styles['product-page']}>
      <div className="container">
        <Button
          buttonStyle="secondary"
          iconSlot={<ArrowLeftIcon width={32} height={32} />}
        >
          Go back
        </Button>

        <MainCard
          className={styles['product-page__product']}
          product={product}
        />

        <RelatedCards
          className={styles['product-page__cards']}
          product={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
