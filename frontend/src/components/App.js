import React, { useContext, useEffect } from 'react';
import { socket } from '../socket.js'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { AuthContext } from '../contexts/AuthContext';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { NotFoundPage } from '../pages/NotFoundPage';
import { HomePage } from '../pages/HomePage';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import ru from '../locales/ru.js'

const App = () => {
  i18next 
    .use(initReactI18next)
    .init({
      resources: { ru },
      lng: 'ru',
    });

  const { token } = useContext(AuthContext);
  useEffect(() => {    
    if (token) {
      return <Navigate to="/" />
    }
  }, []);


  return (
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
  );
};

export default App;
