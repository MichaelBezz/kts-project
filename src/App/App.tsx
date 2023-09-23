import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from 'components/Layout';
import { AppRoute } from 'config/app-route';
import rootStore from 'store/RootStore';
import { useCartStore, useQueryParamsStore } from 'store/RootStore/hooks';
import { RootStoreContext } from 'store/hooks';
import CartPage from './pages/CartPage';
import CategoriesPage from './pages/CategoriesPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';
import ProductsPage from './pages/ProductsPage';

const App: React.FC = () => {
  const { search } = useLocation();

  const queryParamsStore = useQueryParamsStore();
  const cartStore = useCartStore();

  React.useLayoutEffect(() => {
    queryParamsStore.setSearch(search);
  });

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
