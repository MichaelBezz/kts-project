import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import { AppRoute } from 'config/app-route';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';
import ProductsPage from './pages/ProductsPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.index} element={<Layout />}>
          <Route index element={<ProductsPage />} />
          <Route path={AppRoute.product} element={<ProductPage />} />
          <Route path={AppRoute.notFound} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
