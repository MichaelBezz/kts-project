import 'regenerator-runtime';
import 'config/configureMobX';
import './styles/style.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <HashRouter>
    <App />
    <React.StrictMode></React.StrictMode>
  </HashRouter>
);
