import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from 'components/Layout';
import { AppRoute } from 'config/app-route';
import rootStore from 'store/RootStore';
import { useAuthStore, useCartStore, useQueryParamsStore } from 'store/RootStore/hooks';
import { RootStoreContext } from 'store/hooks';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CategoriesPage from './pages/CategoriesPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';
import ProductsPage from './pages/ProductsPage';
import UserPage from './pages/UserPage';

const App: React.FC = () => {
  const { search } = useLocation();

  const authStore = useAuthStore();
  const cartStore = useCartStore();
  const queryParamsStore = useQueryParamsStore();

  React.useEffect(() => {
    authStore.check();
  }, [authStore]);

  React.useEffect(() => {
    cartStore.loadData();
    cartStore.loadOrders();
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
          <Route path={AppRoute.categories} element={<CategoriesPage />} />
          <Route path={AppRoute.about} element={<AboutPage />} />
          <Route path={AppRoute.cart} element={<CartPage />} />
          <Route path={AppRoute.login} element={<LoginPage />} />
          <Route path={AppRoute.user} element={<UserPage />} />
          <Route path={AppRoute.notFound} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </RootStoreContext.Provider>
  );
};

export default App;
