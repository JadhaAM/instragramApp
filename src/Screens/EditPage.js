import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';  
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const EditScreen = () => {
  const navigation = useNavigation();
  const [media, setMedia] = useState(null);
  const [caption, setCaption] = useState('');
  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0]);
    }
  };

  const handleUpdateDetails = () => {
    
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#333', color: '#fff', padding: 10, marginTop:30 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:20, alignItems: 'center', paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 24, color: 'white' }} onPress={() =>{ 
         
          setMedia(null);
          setCaption("");
          navigation.navigate('MainTabs');
          }}>
          <Ionicons name="arrow-back" size={20} /> Profile
        </Text>
        <Text style={{ fontSize: 24 ,color:"white" }}>Edit Profile</Text>
        <Text style={{ fontSize: 24 ,color:"white" }} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={20} /> Home
        </Text>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 40 , gap:4 }}>
        <View style={{ width: 80, height: 80, backgroundColor: '#ccf', borderRadius: 40, overflow: 'hidden' }}>
        {
            media.type.startsWith('image') ? (
              <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: media.uri }} />
            ) 
           : (
            <Ionicons name="image" size={70} color="gray" />
          )}
          
        </View>
        <Button title="Edit Picture" onPress={pickMedia} />
      </View>
      <View style={{ paddingHorizontal: 10, marginTop: 30 }}>
        <Text style={{ fontSize: 16 }}>Edit Account Details</Text>
        <View style={{ opacity: 0.3, marginVertical: 10, borderBottomWidth: 1 }} />
        <TextInput 
          style={{ paddingHorizontal: 10, marginTop: 15, paddingVertical: 5, borderWidth: 2, borderColor: '#888', borderRadius: 5, backgroundColor: '#555', color: '#fff' }} 
          placeholder="Username" 
          placeholderTextColor="#aaa"
        />
        <TextInput 
          style={{ paddingHorizontal: 10, marginTop: 15, paddingVertical: 5, borderWidth: 2, borderColor: '#888', borderRadius: 5, backgroundColor: '#555', color: '#fff' }} 
          placeholder="Name" 
          placeholderTextColor="#aaa"
        />
        <TextInput 
          style={{ paddingHorizontal: 10, marginTop: 15, paddingVertical: 5, borderWidth: 2, borderColor: '#888', borderRadius: 5, backgroundColor: '#555', color: '#fff' }} 
          placeholder="Bio" 
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity 
          style={{ backgroundColor: 'blue', paddingHorizontal: 40, paddingVertical: 10, borderRadius: 5, marginTop: 25 }} 
          onPress={handleUpdateDetails}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>Update Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditScreen;
