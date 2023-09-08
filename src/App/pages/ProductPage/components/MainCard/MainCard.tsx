import cn from 'classnames';
import * as React from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import Slider from '../Slider';
import styles from './MainCard.module.scss';

export type MainCardProps = {
  className?: string;
};

const MainCard: React.FC<MainCardProps> = ({ className }) => {
  return (
    <div className={cn(styles['main-card'], className)}>
      <div className={styles['main-card__slider']}>
        <Slider imageSrc={['https://placehold.co/600x600/orange/white', 'https://placehold.co/600x600/000000/FFF']}/>
      </div>

      <div className={styles['main-card__content']}>
        <Text className={styles['main-card__title']} tag="h1" view="title">
          White Aesthetic Chair
        </Text>

        <Text className={styles['main-card__description']} tag="p" view="p-20" color="secondary">
          Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support
        </Text>

        <Text className={styles['main-card__price']} tag="p" view="title">
          $99.98
        </Text>

        <div className={styles['main-card__controls']}>
          <Button className={cn(styles['main-card__button'], styles['main-card__button--buy'])} buttonStyle="primary">
            Buy Now
          </Button>

          <Button className={cn(styles['main-card__button'], styles['main-card__button--add'])} buttonStyle="secondary">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
