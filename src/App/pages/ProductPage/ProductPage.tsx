import * as React from 'react';
import Button from 'components/Button';
import Loader from 'components/Loader';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import MainCard from './components/MainCard';
import RelatedCards from './components/RelatedCards';
import styles from './ProductPage.module.scss';

const ProductPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

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

        <MainCard className={styles['product-page__product']} />

        <RelatedCards className={styles['product-page__cards']} />
      </div>
    </div>
  );
};

export default ProductPage;
