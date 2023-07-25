import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { AuthProvider } from './contexts/AuthContext';
import { ApiProvider } from './contexts/ApiContext';
import { ModalProvider } from './contexts/ModalContext';
import { Provider } from 'react-redux';
import store from './slices/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ApiProvider>
            <AuthProvider>
                <ModalProvider>
                    <App />
                </ModalProvider>
            </AuthProvider>
        </ApiProvider>
    </Provider>
    );
