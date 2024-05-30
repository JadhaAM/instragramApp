// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import api from '../src/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await api.get('/check');
        if (response.data.user) {
          setUser(response.data.user);
        
          
        }
        console.log('Checking user with API URL:', api.defaults.baseURL);
      } catch (error) {
        console.error('Error checking user:', error);
      }
    };
    
    const fetchUser = async () => {
      try {
        const response = await axios.get('/profile', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    checkUser();
    fetchUser();
  }, []);

  const login = async (values) => {
    try {
      const response = await api.post('/login', values);
      console.log(response);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Re-throw the error to be caught by the login handler
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout ,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

