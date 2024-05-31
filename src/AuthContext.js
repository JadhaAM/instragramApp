import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState('');
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        if (storedToken) {
          const decodedToken = jwtDecode(storedToken);
          setUserId(decodedToken.userId);
          setAuthUser(storedToken);
          setToken(storedToken);  // Set the token here
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, userId, setUserId, authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
