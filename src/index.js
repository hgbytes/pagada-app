import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import { LoadingProvider } from './context/LoadingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </React.StrictMode>
);