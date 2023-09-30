import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import CategoryLoader from 'components/loaders/CategoryLoader';
import { useCategoriesStore } from 'store/hooks';
import CategoryItem from '../CategoryItem';
import styles from './CategoryList.module.scss';

export type CategoryListProps = {
  className?: string;
};

const CategoryList: React.FC<CategoryListProps> = ({ className }) => {
  const categoriesStore = useCategoriesStore();

  return (
    <div className={cn(styles['category-list'], className)}>
      {categoriesStore.isLoading ? (
        <CategoryLoader className={styles['category-list__body']} cards={6} />
      ) : (
        <ul className={styles['category-list__body']}>
          {categoriesStore.categories.map((category) => (
            <li key={category.id}>
              <CategoryItem category={category} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default observer(CategoryList);
