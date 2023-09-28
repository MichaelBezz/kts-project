import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from 'components/Layout';
import { AppRoute } from 'config/app-route';
import { ACCESS_TOKEN } from 'services/api';
import rootStore from 'store/RootStore';
import { useAuthStore, useCartStore, useQueryParamsStore } from 'store/RootStore/hooks';
import { RootStoreContext } from 'store/hooks';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';
import ProductsPage from './pages/ProductsPage';

const App: React.FC = () => {
  const { search } = useLocation();

  const authStore = useAuthStore();
  const cartStore = useCartStore();
  const queryParamsStore = useQueryParamsStore();

  React.useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      authStore.check();
    }
  }, [authStore]);

  React.useEffect(() => {
    cartStore.loadData();
  }, [cartStore]);

  React.useLayoutEffect(() => {
    queryParamsStore.setSearch(search);
  });

  return (
    <RootStoreContext.Provider value={rootStore}>
      <Routes>
        <Route path={AppRoute.index} element={<Layout />}>
          <Route index element={<ProductsPage />} />
          <Route path={AppRoute.product} element={<ProductPage />} />
          <Route path={AppRoute.cart} element={<CartPage />} />
          <Route path={AppRoute.login} element={<LoginPage />} />
          <Route path={AppRoute.notFound} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </RootStoreContext.Provider>
  );
};

export default App;
