import React, { createContext, useState } from 'react';
import axios from 'axios';
import  api  from '../routes/api';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState();
    const [errorAuth, setErrorAuth] = useState();
    const login = async (user) => {
      const getToken = async (user) => {
        try {
          const response = await axios.post(api.loginPath(), user );
          return response.data.token;
         } catch (error) {
            if (error.response.status === 401) {
                return false;
            }
          console.error('Ошибка при получении токена:', error);
        }
      }
    const token = await getToken(user);
    if (token) {
      console.log('true')
      setToken(token);
      localStorage.setItem('token', token);
    } else {
      setErrorAuth('401');
    }   
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
