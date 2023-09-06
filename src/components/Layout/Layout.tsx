import * as React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}></header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
