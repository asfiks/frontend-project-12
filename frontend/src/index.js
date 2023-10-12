import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './components/App';
import { AuthProvider } from './contexts/AuthContext';
import { ApiProvider } from './contexts/ApiContext';
import store from './slices/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ApiProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApiProvider>
  </Provider>,
);
