
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from @expo/vector-icons
import Header from '../components/Header';
import Stories from '../components/Stories';
import AllPostScreen from './AllPostPage';



const HomeScreen = () => {
 
  return (
    <View style={styles.container}>
     
      
      
      {/* Main Section */}
      <View style={styles.mainSection}>
        <Header/>
        <Stories/>
        <AllPostScreen/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: '#ffffff',
  },
 
});

export default HomeScreen;