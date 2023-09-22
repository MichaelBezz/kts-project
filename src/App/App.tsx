import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import { AppRoute } from 'config/app-route';
import { RootStoreContext } from 'context/RootStoreContext';
import rootStore from 'store/RootStore';
import { useCartStore, useQueryParamsStoreInit } from 'store/RootStore/hooks';
import CartPage from './pages/CartPage';
import CategoriesPage from './pages/CategoriesPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';
import ProductsPage from './pages/ProductsPage';

const App: React.FC = () => {
  const cartStore = useCartStore();

  useQueryParamsStoreInit();

  React.useEffect(() => {
    cartStore.loadData();
  }, [cartStore]);

  return (
    <RootStoreContext.Provider value={rootStore}>
      <Routes>
        <Route path={AppRoute.index} element={<Layout />}>
          <Route index element={<ProductsPage />} />
          <Route path={AppRoute.product} element={<ProductPage />} />
          <Route path={AppRoute.categories} element={<CategoriesPage />} />
          <Route path={AppRoute.cart} element={<CartPage />} />
          <Route path={AppRoute.login} element={<LoginPage />} />
          <Route path={AppRoute.notFound} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </RootStoreContext.Provider>
  );
};

export default App;
