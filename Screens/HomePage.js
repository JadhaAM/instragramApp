
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from @expo/vector-icons


const HomeScreen = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sideBarOpen=()=>{
      setIsSidebarVisible(true);
  }
  return (
    <View style={styles.container}>
      {/* Side Navigation Bar */}
      {/* {isSidebarVisible && (
          <View style={styles.sidebar}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="signUp" component={SignUp} />
          </View>
        )} */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.iconContainer} onPress={sideBarOpen()}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="notifications" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      {/* Main Section */}
      <View style={styles.mainSection}>
        <Text style={styles.heading}>Welcome to the Home Page</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  iconContainer: {
    padding: 5,
  },
  mainSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sidebar: {
    width: 200,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
});

export default HomeScreen;