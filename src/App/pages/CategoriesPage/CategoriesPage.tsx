import * as React from 'react';
import Text from 'components/Text';
import CategoriesStore from 'store/CategoriesStore';
import { CategoriesStoreContext, useLocalStore } from 'store/hooks';
import CategoryList from './components/CategoryList';
import styles from './CategoriesPage.module.scss';

const CategoriesPage: React.FC = () => {
  const categoriesStore = useLocalStore(() => new CategoriesStore());

  React.useEffect(() => {
    categoriesStore.getCategories();
  }, [categoriesStore]);

  return (
    <CategoriesStoreContext.Provider value={categoriesStore}>
      <div className={styles['categories-page']}>
        <div className="container">
          <div className={styles['categories-page__header']}>
            <Text className={styles['categories-page__title']} tag="h1" view="title" color="primary">
              Categories
            </Text>

            <Text className={styles['categories-page__description']} view="p-20" color="secondary">
              We&nbsp;are pleased to&nbsp;introduce our product categories,
              you can choose any of&nbsp;them and proceed to&nbsp;shopping
            </Text>
          </div>

          <CategoryList className={styles['categories-page__body']} />
        </div>
      </div>
    </CategoriesStoreContext.Provider>
  );
};

export default React.memo(CategoriesPage);
