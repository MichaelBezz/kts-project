import cn from 'classnames';
import * as React from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import { ProductModel } from 'store/models/product';
import Slider from '../Slider';
import styles from './MainCard.module.scss';

export type MainCardProps = {
  className?: string;
  product: ProductModel;
};

const MainCard: React.FC<MainCardProps> = ({ className, product }) => {
  return (
    <div className={cn(styles['main-card'], className)}>
      <div className={styles['main-card__slider']}>
        <Slider imageSrc={product.images}/>
      </div>

      <div className={styles['main-card__content']}>
        <Text className={styles['main-card__title']} tag="h1" view="title">
          {product.title}
        </Text>

        <Text className={styles['main-card__description']} tag="p" view="p-20" color="secondary">
          {product.description}
        </Text>

        <Text className={styles['main-card__price']} tag="p" view="title">
          {`$${product.price}`}
        </Text>

        <div className={styles['main-card__controls']}>
          <Button
            className={cn(
              styles['main-card__button'],
              styles['main-card__button--buy']
            )}
            buttonStyle="primary"
          >
            Buy Now
          </Button>

          <Button
            className={cn(
              styles['main-card__button'],
              styles['main-card__button--add']
            )}
            buttonStyle="secondary"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainCard);
