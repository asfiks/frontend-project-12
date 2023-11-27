import React, {
  createContext, useState, useEffect, useMemo, useCallback,
} from 'react';
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

  const login = useCallback(async (user) => {
    try {
      const response = await axios.post(api.loginPath(), user);
      const newToken = response.data.token;
      setToken(newToken);
      localStorage.setItem('token', newToken);
      localStorage.setItem('username', user.username);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorAuth('401');
      }
      console.error('Ошибка при получении токена:', error);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken('');
  }, []);

  const authContextValue = useMemo(() => ({
    token, errorAuth, login, logout,
  }), [token, errorAuth, login, logout]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
