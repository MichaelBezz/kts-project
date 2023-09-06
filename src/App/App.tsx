import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from 'config/routes';
import MainPage from './pages/MainPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
