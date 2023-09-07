import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import { AppRoute } from 'config/app-route';
import ProductsPage from './pages/ProductsPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Products} element={<Layout />}>
          <Route index element={<ProductsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
