import cn from 'classnames';
import * as React from 'react';
import Text from 'components/Text';
import CategoryList from './CategoryList/CategoryList';
import styles from './CategoriesPage.module.scss';

const CategoriesPage: React.FC = () => {
  return (
    <div className={styles['categories-page']}>
      <div className={cn(styles['categories-page__wrapper'], 'container')}>
        <Text tag="h1" view="title" color="primary">
          Categories
        </Text>

        <CategoryList />
      </div>
    </div>
  );
};

export default CategoriesPage;
