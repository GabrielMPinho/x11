import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CompareProvider } from './hooks/useCompare';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CompareProvider>
        <App />
      </CompareProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
