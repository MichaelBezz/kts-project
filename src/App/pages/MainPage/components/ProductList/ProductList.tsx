import cn from 'classnames';
import * as React from 'react';
import Button from 'components/Button';
import Card from 'components/Card';
import Text from 'components/Text';
import Pagination from '../Pagination';
import styles from './ProductList.module.scss';

export type ProductListProps = {
  className?: string;
};

const ProductList: React.FC<ProductListProps> = ({ className }) => {
  return (
    <section className={cn(styles['product-list'], className)}>
      <div className="container">
        <div className={styles['product-list__header']}>
          <Text tag="h2" view="p-32">
            Total Product
          </Text>

          <Text tag="p" view="p-20" weight="bold" color="accent">
            184
          </Text>
        </div>

        <ul className={styles['product-list__body']}>
          <li className={styles['product-list__item']}>
            <Card
              image={'https://placehold.co/360x360'}
              captionSlot={'Chair'}
              title={'White Aesthetic Chair'}
              subtitle={'Combination of wood and wool'}
              contentSlot={'$63.47'}
              onClick={() => {}}
              actionSlot={<Button>Add to Cart</Button>}
            />
          </li>
          <li className={styles['product-list__item']}>
            <Card
              image={'https://placehold.co/360x360'}
              captionSlot={'Chair'}
              title={'White Aesthetic Chair'}
              subtitle={'Combination of wood and wool'}
              contentSlot={'$63.47'}
              onClick={() => {}}
              actionSlot={<Button>Add to Cart</Button>}
            />
          </li>
          <li className={styles['product-list__item']}>
            <Card
              image={'https://placehold.co/360x360'}
              captionSlot={'Chair'}
              title={'White Aesthetic Chair'}
              subtitle={'Combination of wood and wool'}
              contentSlot={'$63.47'}
              onClick={() => {}}
              actionSlot={<Button>Add to Cart</Button>}
            />
          </li>
          <li className={styles['product-list__item']}>
            <Card
              image={'https://placehold.co/360x360'}
              captionSlot={'Chair'}
              title={'White Aesthetic Chair'}
              subtitle={'Combination of wood and wool'}
              contentSlot={'$63.47'}
              onClick={() => {}}
              actionSlot={<Button>Add to Cart</Button>}
            />
          </li>
          <li className={styles['product-list__item']}>
            <Card
              image={'https://placehold.co/360x360'}
              captionSlot={'Chair'}
              title={'White Aesthetic Chair'}
              subtitle={'Combination of wood and wool'}
              contentSlot={'$63.47'}
              onClick={() => {}}
              actionSlot={<Button>Add to Cart</Button>}
            />
          </li>
          <li className={styles['product-list__item']}>
            <Card
              image={'https://placehold.co/360x360'}
              captionSlot={'Chair'}
              title={'White Aesthetic Chair'}
              subtitle={'Combination of wood and wool'}
              contentSlot={'$63.47'}
              onClick={() => {}}
              actionSlot={<Button>Add to Cart</Button>}
            />
          </li>
          <li className={styles['product-list__item']}>
            <Card
              image={'https://placehold.co/360x360'}
              captionSlot={'Chair'}
              title={'White Aesthetic Chair'}
              subtitle={'Combination of wood and wool'}
              contentSlot={'$63.47'}
              onClick={() => {}}
              actionSlot={<Button>Add to Cart</Button>}
            />
          </li>
          <li className={styles['product-list__item']}>
            <Card
              image={'https://placehold.co/360x360'}
              captionSlot={'Chair'}
              title={'White Aesthetic Chair'}
              subtitle={'Combination of wood and wool'}
              contentSlot={'$63.47'}
              onClick={() => {}}
              actionSlot={<Button>Add to Cart</Button>}
            />
          </li>
          <li className={styles['product-list__item']}>
            <Card
              image={'https://placehold.co/360x360'}
              captionSlot={'Chair'}
              title={'White Aesthetic Chair'}
              subtitle={'Combination of wood and wool'}
              contentSlot={'$63.47'}
              onClick={() => {}}
              actionSlot={<Button>Add to Cart</Button>}
            />
          </li>
        </ul>

        <Pagination className={styles['product-list__pagination']} />
      </div>
    </section>
  );
};

export default ProductList;
