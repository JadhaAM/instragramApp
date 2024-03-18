import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './auth/SignUp';
import LoginScreen from './auth/LoginFrom';
import HomeScreen from './Screens/HomePage';
import ProfileScreen from './Screens/UserProfile'


const Stack = createStackNavigator();
export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="signUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
