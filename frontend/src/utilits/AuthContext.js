import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState();
    const [errorAuth, setErrorAuth] = useState();
    const login = async (user) => {
      const getToken = async (user) => {
        try {
          const response = await axios.post('/api/v1/login', user );
          return response.data.token;
         } catch (error) {
            if (error.response.status === 401) {
                return false;
            }
          console.error('Ошибка при получении токена:', error);
          return null;
        }
      }
    const token = await getToken(user)
    token ? setToken(token): setErrorAuth('401');
    localStorage.setItem('token', token);
  };

  const logout = () => {
    localStorage.removeItem('token')
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ token, errorAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
