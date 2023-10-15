import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import { Provider } from 'react-redux';
import { AuthProvider, AuthContext } from '../contexts/AuthContext';
import { ApiProvider } from '../contexts/ApiContext';
import store from '../slices/index';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { NotFoundPage } from '../pages/NotFoundPage';
import { HomePage } from '../pages/HomePage';
import ru from '../locales/ru';

const App = () => {
  i18next
    .use(initReactI18next)
    .init({
      resources: { ru },
      lng: 'ru',
    });

  const { token } = useContext(AuthContext);
  
  return (
    <Provider store={store}>
      <ApiProvider>
        <AuthProvider>
          <I18nextProvider i18next={i18next}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={token ? <HomePage /> : <Login />} />
                <Route path="/login" element={token ? <HomePage /> : <Login />} />
                <Route path="/signup" element={token ? <Signup /> : <Signup />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </I18nextProvider>
        </AuthProvider>
      </ApiProvider>
    </Provider>
  );
};

export default App;
