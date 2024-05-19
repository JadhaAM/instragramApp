
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from @expo/vector-icons
import Header from '../components/Header';
import Stories from '../components/Stories';
import EditScreen from './EditPage';


const HomeScreen = () => {
 
  return (
    <View style={styles.container}>
     
      
      
      {/* Main Section */}
      <View style={styles.mainSection}>
        <Header/>
        <Stories/>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#ffffff',
  },
 
});

export default HomeScreen;