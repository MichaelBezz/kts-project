import cn from 'classnames';
import * as React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import Pagination from 'components/Pagination';
import Text from 'components/Text';
import { AppRoute } from 'config/app-route';
import { TProducts } from 'types/product';
import styles from './CardList.module.scss';

export type CardListProps = {
  className?: string;
  products: TProducts;
};

const CardList: React.FC<CardListProps> = ({ className, products }) => {
  const navigate = useNavigate();

  return (
    <section className={cn(styles['card-list'], className)}>
      <div className={styles['card-list__header']}>
        <Text tag="h2" view="p-32">
          Total Product
        </Text>

        <Text tag="p" view="p-20" weight="bold" color="accent">
          {products.length}
        </Text>
      </div>

      <ul className={styles['card-list__body']}>
        {products.slice(0, 9).map((product) => (
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

      <Pagination className={styles['card-list__pagination']} />
    </section>
  );
};

export default CardList;
