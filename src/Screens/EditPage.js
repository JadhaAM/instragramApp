import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Icon} from "@expo/vector-icons";
import axios from 'axios';

const EditScreen=()=>{

    const navigation = useNavigation();
 return (
<View style={{ flex: 1, backgroundColor: '#333', color: '#fff', padding: 20 }}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
    <Text style={{ fontSize: 14, color: 'blue' }} onPress={() => navigation.navigate('ProfileScreen')}>
      <Icon name="arrow-left" size={20} /> Profile
    </Text>
    <Text style={{ fontSize: 14 }}>Edit Profile</Text>
    <Text style={{ fontSize: 14 }} onPress={() => navigation.navigate('HomeScreen')}>
      <Icon name="home" size={20} /> Home
    </Text>
  </View>
  <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
    <View style={{ width: 80, height: 80, backgroundColor: '#ccf', borderRadius: 40, overflow: 'hidden' }}>
      <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: `/images/updates/${user.profileImage}` }} />
    </View>
    <Button title="Edit Picture" onPress={() => handleEditPicture()} />
  </View>
  <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
    <Text style={{ fontSize: 16 }}>Edit Account Details</Text>
    <View style={{ opacity: 0.3, marginVertical: 3, borderBottomWidth: 1 }} />
    <TextInput style={{ paddingHorizontal: 10, marginTop: 5, paddingVertical: 5, borderWidth: 2, borderColor: '#888', borderRadius: 5, backgroundColor: '#333' }} placeholder="Username" value={user.username} />
    <TextInput style={{ paddingHorizontal: 10, marginTop: 5, paddingVertical: 5, borderWidth: 2, borderColor: '#888', borderRadius: 5, backgroundColor: '#333' }} placeholder="Name" value={user.name} />
    <TextInput style={{ paddingHorizontal: 10, marginTop: 5, paddingVertical: 5, borderWidth: 2, borderColor: '#888', borderRadius: 5, backgroundColor: '#333' }} placeholder="Bio" value={user.bio} />
    <TouchableOpacity style={{ backgroundColor: 'blue', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, marginTop: 5 }} onPress={() => handleUpdateDetails()}>
      <Text style={{ color: '#fff', textAlign: 'center' }}>Update Details</Text>
    </TouchableOpacity>
  </View>
</View>

 );
};

export default EditScreen ;
