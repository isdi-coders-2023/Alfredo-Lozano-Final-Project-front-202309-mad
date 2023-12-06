import React from 'react';
import ReactDOM from 'react-dom/client';
// Import App from './components/app/App';
import { Provider } from 'react-redux';
import { appStore } from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={appStore}>{/* <App></App> */}</Provider>
  </React.StrictMode>
);
