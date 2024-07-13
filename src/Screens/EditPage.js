import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const EditScreen = () => {
  const navigation = useNavigation();
  const [media, setMedia] = useState(null);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const token = 'YOUR_AUTH_TOKEN'; // Make sure to replace this with your actual token
  const apiUrl = 'YOUR_API_URL'; // Make sure to replace this with your actual API URL

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

  const handleUpdateDetails = async () => {
    try {
      const formData = new FormData();
      if (media) {
        formData.append('media', {
          uri: media.uri,
          name: media.uri.split('/').pop(),
          type: media.type || 'image/jpeg', // Ensure media type is set, default to image/jpeg
        });
      }
      formData.append('username', username);
      formData.append('name', name);
      formData.append('bio', bio);

     

      const response = await axios.post(`${apiUrl}/update`, formData, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`, // Ensure token is valid
        },
      });

      if (response.status === 200) {
        console.log('Response:', response);
        Alert.alert('Success', 'Profile updated successfully');
        navigation.navigate('MainTabs');
      } else {
        Alert.alert('Error', 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response) {
        // Server responded with a status other than 2xx
        Alert.alert('Error', `Server Error: ${error.response.data.message}`);
      } else if (error.request) {
        // Request was made but no response received
        Alert.alert('Error', 'Network Error: No response received from server');
      } else {
        // Something else caused the error
        Alert.alert('Error', `Error: ${error.message}`);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#333', color: '#fff', padding: 10, marginTop: 30 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignItems: 'center', paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 24, color: 'white' }} onPress={() => {
          setMedia(null);
          setUsername('');
          setName('');
          setBio('');
          navigation.navigate('MainTabs');
        }}>
          <Ionicons name="arrow-back" size={20} /> Profile
        </Text>
        <Text style={{ fontSize: 24, color: "white" }}>Edit Profile</Text>
        <Text style={{ fontSize: 24, color: "white" }} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={20} /> Home
        </Text>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 40, gap: 4 }}>
        <View style={{ width: 80, height: 80, backgroundColor: '#ccf', borderRadius: 40, overflow: 'hidden' }}>
          {media && media.type && media.type.startsWith('image') ? (
            <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: media.uri }} />
          ) : (
            <Ionicons name="image" size={70} color="gray" />
          )}
        </View>
        <Button title="Edit Picture" onPress={pickMedia} />
      </View>
      <View style={{ paddingHorizontal: 10, marginTop: 30 }}>
        <Text style={{ fontSize: 16, color: 'white' }}>Edit Account Details</Text>
        <View style={{ opacity: 0.3, marginVertical: 10, borderBottomWidth: 1, borderColor: 'white' }} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Bio"
          placeholderTextColor="#aaa"
          value={bio}
          onChangeText={setBio}
        />
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateDetails}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>Update Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 10,
    marginTop: 15,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 5,
    backgroundColor: '#555',
    color: '#fff',
  },
  updateButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 25,
  },
});

export default EditScreen;
