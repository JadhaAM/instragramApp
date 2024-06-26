import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import ReelsScreen from './src/Screens/ReelsScreen';
import HomeScreen from './src/Screens/HomePage';
import ProfileScreen from './src/Screens/UserProfile';
import SearchScreen from './src/Screens/SearchPage';
import PostScreen from './src/Screens/UpdatePage';
import LoginScreen from './src/auth/LoginFrom';
import SignUp from './src/auth/SignUp';
import ChatRoom from './src/Screens/ChatRoom';
import { AuthProvider, AuthContext } from './src/AuthContext';
import { SocketContextProvider } from './src/SocketContext';
import ChatsScreen from './src/Screens/ChatsScreen';
import EditScreen from './src/Screens/EditPage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Post') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Reels') {
            iconName = focused ? 'videocam' : 'videocam-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style:[
          {
            display:"flex"
          },
          null
        ],
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Post" component={PostScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Reels" component={ReelsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="ChatScreen" component={ChatsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} options={{ headerShown: false }} />
      <Stack.Screen name="EditScreen" component={EditScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function App() {
  const { token, setToken } = useContext(AuthContext);
  const [isTokenFetched, setIsTokenFetched] = useState(false);

  useEffect(() => {
    const fetchUserToken = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
      }
      setIsTokenFetched(true);
    };

    fetchUserToken();
  }, []);

  if (!isTokenFetched) {
    return null; 
  }

  return (
    <NavigationContainer>
      {token === null ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthProvider>
  );
}
