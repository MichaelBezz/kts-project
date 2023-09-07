import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import { AppRoute } from 'config/app-route';
import ProductPage from './pages/ProductPage';
import ProductsPage from './pages/ProductsPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Index} element={<Layout />}>
          <Route index element={<ProductsPage />} />
          <Route path={AppRoute.Product} element={<ProductPage />} />
          {/* <Route path={AppRoute.Categories} element={<CategoriesPage />} /> */}
          {/* <Route path={AppRoute.About} element={<AboutPage />} /> */}
          {/* <Route path={AppRoute.NotFound} element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
