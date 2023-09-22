import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import CategoriesStore from 'store/CategoriesStore';
import { useLocalStore } from 'store/hooks';
import CategoryItem from '../CategoryItem';
import styles from './CategoryList.module.scss';

export type CategoryListProps = {
  className?: string;
};

const CategoryList: React.FC<CategoryListProps> = ({ className }) => {
  const categoriesStore = useLocalStore(() => new CategoriesStore());

  React.useEffect(() => {
    categoriesStore.getCategories();
  }, [categoriesStore]);

  return (
    <div className={cn(styles['category-list'], className)}>
      <ul className={styles['category-list__body']}>
        {categoriesStore.categories.map((category) => (
          <li key={category.id}>
            <CategoryItem category={category} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(CategoryList);
