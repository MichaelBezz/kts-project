import cn from 'classnames';
import * as React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import Text from 'components/Text';
import { AppRoute } from 'config/app-route';
import { TProduct } from 'types/product';
import styles from './RelatedCards.module.scss';

export type RelatedCardsProps = {
  className?: string;
  products: TProduct[];
};

const RelatedCards: React.FC<RelatedCardsProps> = ({ className, products }) => {
  const navigate = useNavigate();

  return (
    <div className={cn(styles['related-cards'], className)}>
      <Text tag="h2" view='p-32'>
        Related Items
      </Text>

      <ul className={styles['related-cards__list']}>
        {products.map((product) => (
          <li key={product.id}>
            <Card
              image={product.images[0]}
              captionSlot={product.category.name}
              title={product.title}
              subtitle={product.description}
              contentSlot={`$${product.price}`}
              onClick={() => navigate(generatePath(AppRoute.Product, {id: `${product.id}`}))}
              actionSlot={<Button buttonStyle="primary">Add to Cart</Button>}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedCards;
