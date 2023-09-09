import cn from 'classnames';
import * as React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import Text from 'components/Text';
import { AppRoute } from 'config/app-route';
import { TProduct } from 'types/product';
import styles from './CardList.module.scss';

export type CardListProps = {
  className?: string;
  totalProduct: number;
  products: TProduct[];
};

const CardList: React.FC<CardListProps> = ({ className, totalProduct, products }) => {
  const navigate = useNavigate();

  return (
    <section className={cn(styles['card-list'], className)}>
      <div className={styles['card-list__header']}>
        <Text tag="h2" view="p-32">
          Total Product
        </Text>

        <Text tag="p" view="p-20" weight="bold" color="accent">
          {totalProduct}
        </Text>
      </div>

      <ul className={styles['card-list__body']}>
        {products.map((product) => (
          <li key={product.id} className={styles['card-list__item']}>
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
    </section>
  );
};

export default CardList;
