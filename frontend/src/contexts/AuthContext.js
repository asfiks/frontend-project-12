import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import api from '../routes/api';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [errorAuth, setErrorAuth] = useState();

  useEffect(() => {
    const tokenInStorage = localStorage.getItem('token');
    if (tokenInStorage) {
      setToken(tokenInStorage);
    }
  }, []);

  const login = async (user) => {
    try {
      const response = await axios.post(api.loginPath(), user);
      const newToken = response.data.token;
      setToken(newToken);
      localStorage.setItem('token', newToken);
      
      localStorage.setItem('username', user.username);
    } catch (error) {
      if (error.response.status === 401) {
        setErrorAuth('401');
      }
      console.error('Ошибка при получении токена:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ token, errorAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};