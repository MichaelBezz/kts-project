import cn from 'classnames';
import * as React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import Text from 'components/Text';
import { AppRoute } from 'config/app-route';
import styles from './RelatedCards.module.scss';

export type RelatedCardsProps = {
  className?: string;
};

const RelatedCards: React.FC<RelatedCardsProps> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div className={cn(styles['related-cards'], className)}>
      <Text tag="h2" view='p-32'>
        Related Items
      </Text>

      <ul className={styles['related-cards__list']}>
        <li className={styles['related-cards__item']}>
          <Card
            image={'https://placehold.co/360x360/orange/white'}
            captionSlot={'Chair'}
            title={'White Aesthetic Chair'}
            subtitle={'Combination of wood and wool'}
            contentSlot={`$63.47`}
            onClick={() => navigate(generatePath(AppRoute.Product, {id: `id`}))}
            actionSlot={<Button buttonStyle="primary">Add to Cart</Button>}
          />
        </li>
        <li className={styles['related-cards__item']}>
          <Card
            image={'https://placehold.co/360x360/orange/white'}
            captionSlot={'Chair'}
            title={'White Aesthetic Chair'}
            subtitle={'Combination of wood and wool'}
            contentSlot={`$63.47`}
            onClick={() => navigate(generatePath(AppRoute.Product, {id: `id`}))}
            actionSlot={<Button buttonStyle="primary">Add to Cart</Button>}
          />
        </li>
        <li className={styles['related-cards__item']}>
          <Card
            image={'https://placehold.co/360x360/orange/white'}
            captionSlot={'Chair'}
            title={'White Aesthetic Chair'}
            subtitle={'Combination of wood and wool'}
            contentSlot={`$63.47`}
            onClick={() => navigate(generatePath(AppRoute.Product, {id: `id`}))}
            actionSlot={<Button buttonStyle="primary">Add to Cart</Button>}
          />
        </li>
      </ul>
    </div>
  );
};

export default RelatedCards;
