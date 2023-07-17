import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { AuthContext } from '../contexts/AuthContext';
import { SignUp } from '../pages/SignUp';
import { NotFoundPage } from '../pages/NotFoundPage';
import { HomePage } from '../pages/HomePage';

const App = () => {
  const { token } = useContext(AuthContext);
  useEffect(() => {    
    if (token) {
      console.log(token)
      return <Navigate to="/" />
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <HomePage /> : <SignUp />} />
        <Route path="login" element={token ? <HomePage /> : <SignUp />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
