import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode'; // Correct import statement
import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState('');
  const [authUser, setAuthUser] = useState(null); // Set initially to null

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        if (storedToken) {
          const decodedToken = jwtDecode(storedToken);
          setToken(storedToken);
          setUserId(decodedToken.userId);
          setAuthUser(storedToken); // Set authUser after token is fetched
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  console.log("authUser:", authUser); // Log authUser after it's set asynchronously

  return (
    <AuthContext.Provider value={{ token, userId, setToken, setUserId, authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
