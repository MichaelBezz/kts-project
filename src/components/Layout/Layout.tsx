import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from 'components/Footer';
import Header from 'components/Header';
import styles from './Layout.module.scss';

const Layout: React.FC = () => {
  return (
    <div className={styles['layout']}>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
