// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import api from '../src/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    api.get('/check').then(response => {
      if (response.data.user) {
        setUser(response.data.user);
      }
    });
  }, []);

  const login = async (values) => {
    const response = await api.post('/login', values);
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
