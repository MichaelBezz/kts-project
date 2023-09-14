import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/Header';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit';
import styles from './Layout.module.scss';

const Layout: React.FC = () => {
  useQueryParamsStoreInit();

  return (
    <div className={styles['layout']}>
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
