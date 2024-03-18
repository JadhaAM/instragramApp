import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Icon} from "@expo/vector-icons";
import axios from 'axios';

const PostScreen =()=>{

    const navigation = useNavigation();
    return (
        <>
        {/* <Header /> */}
  <View style={{ flex: 1, backgroundColor: '#333', color: 'white', padding: 20 }}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
    <TouchableOpacity style={{ fontSize: 12, color: 'blue' }} onPress={() => navigation.navigate('Profile')}>
      <Icon name="arrow-left" size={20} color="blue" /> Profile
    </TouchableOpacity>
    <Text style={{ fontSize: 12 }}>Upload Post</Text>
    <TouchableOpacity style={{ fontSize: 12 }} onPress={() => navigation.navigate('Feed')}>
      <Icon name="home" size={20} color="black" /> Home
    </TouchableOpacity>
  </View>
  <View style={{ flexDirection: 'column', alignItems: 'center', gap: 2, marginTop: 80 }}>
    <View style={{ width: '25%', height: '25%', borderRadius: 100, borderWidth: 2, borderColor: '#222', alignItems: 'center', justifyContent: 'center' }}>
      <Icon name="image" size={50} color="gray" />
    </View>
    <TouchableOpacity id="selectpic" style={{ color: 'blue', textTransform: 'capitalize' }}>Select Picture</TouchableOpacity>
  </View>
  <View style={{ width: '100%', padding: 20, marginTop: 100 }}>
    <TextInput style={{ display: 'none' }} type="file" name="image" />
    <TextInput style={{ width: '100%', height: 200, backgroundColor: '#333', borderWidth: 2, borderColor: '#222', borderRadius: 5, padding: 10 }} placeholder="Write a caption..." />
    <TouchableOpacity style={{ width: '100%', padding: 10, backgroundColor: 'blue', borderRadius: 5 }} onPress={handleSubmit}>Post</TouchableOpacity>
  </View>
</View>
{/* <Footer /> */}
</>

    );
}

export default PostScreen;