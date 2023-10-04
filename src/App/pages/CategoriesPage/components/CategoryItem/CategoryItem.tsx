import cn from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import { AppRoute } from 'config/app-route';
import { ICategory } from 'models/CategoryModel';
import styles from './CategoryItem.module.scss';

export type CategoryItemProps = {
  className?: string;
  category: ICategory;
};

const CategoryItem: React.FC<CategoryItemProps> = ({ className, category }) => {
  return (
    <Link
      className={cn(styles['category-item'], className)}
      to={`${AppRoute.index}?category=${category.id}`}
    >
      <div className={styles['category-item__image']}>
        <img src={category.image} width="360" height="360" alt="Main category image" />
      </div>

      <div className={styles['category-item__content']}>
        <Text className={styles['category-item__title']} tag="p" view="p-24" weight="bold">
          {category.name}
        </Text>
      </div>
    </Link>
  );
};

export default React.memo(CategoryItem);
