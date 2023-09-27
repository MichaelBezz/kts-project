import cn from 'classnames';
import * as React from 'react';
import Text from 'components/Text';
import AddButton from 'components/buttons/AddButton';
import BuyButton from 'components/buttons/BuyButton';
import ProductModel from 'models/ProductModel';
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
          ${product.price}
        </Text>

        <div className={styles['main-card__controls']}>
          <BuyButton
            className={cn(
              styles['main-card__button'],
              styles['main-card__button--buy']
            )}
            product={product}
          />

          <AddButton
            className={cn(
              styles['main-card__button'],
              styles['main-card__button--add']
            )}
            product={product}
            style="secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainCard);
