import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import { AppRoute } from 'config/app-route';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';
import ProductsPage from './pages/ProductsPage';

const App: React.FC = () => {
  useQueryParamsStoreInit();

  return (
    <Routes>
      <Route path={AppRoute.index} element={<Layout />}>
        <Route index element={<ProductsPage />} />
        <Route path={AppRoute.product} element={<ProductPage />} />
        <Route path={AppRoute.cart} element={<CartPage />} />
        <Route path={AppRoute.notFound} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
