// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import api from './api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    api.get('/auth/check').then(response => {
      if (response.data.user) {
        setUser(response.data.user);
      }
    });
  }, []);

  const login = async (values) => {
    const response = await api.post('/auth/login', values);
    setUser(response.data.user);
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
