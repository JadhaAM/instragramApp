import React, { useState ,useContext} from 'react';
import { View, Text, TextInput, Alert, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Video } from 'expo-av';
import { AuthContext } from '../AuthContext';





const apiUrl = process.env.EXPO_PUBLIC_SERVER_URL;
console.log('Error fetching userProfile:', apiUrl);

const PostScreen = ({ navigation }) => {
  const [media, setMedia] = useState(null);
  const [caption, setCaption] = useState('');
  const { token, setToken, setUserId, userId } = useContext(AuthContext);
  const { authUser: contextUser } = useContext(AuthContext);
  
  console.log('Context User:', contextUser);
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

  const handleSubmit = async () => {
     
    console.log("am going to post");
    if (!media || !caption) {
      Alert.alert('Error', 'Please select an image or video and write a caption');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('media', {
        uri: media.uri,
        name: media.type.startsWith('image') ? 'photo.jpg' : 'video.mp4',
        type: media.type,
      });
      formData.append('caption', caption);
      
    
      console.log('FormData:', formData); 
    
      const response = await axios.post(`${apiUrl}/upload`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
       }
      });
    
      if (response.status === 200) {
        Alert.alert('Success', 'Your post has been uploaded');
        navigation.navigate('MainTabs');
      } else {
        Alert.alert('Error', 'Failed to upload post');
      }
    } catch (error) {
      Alert.alert('Error', "An error occurred in sending a post");
      console.error('Error in post to send server:', error.response ? error.response.data : error.message);
    
      if (error.message === 'Network Error') {
        console.error('Network Error:', 'Please check your internet connection or server URL.');
      } else {
        console.error('Other Error:', error);
      }
    }
    
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          setMedia(null);
          setCaption("");
          navigation.navigate('Home');
          console.log("navigate to maintab")
        }}>
          <Ionicons name="close" size={20} color="white" />
          <Text style={styles.headerText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Post</Text>
        <Text style={styles.headerTitle}>Next</Text>
      </View>
      <View style={styles.mediaPickerContainer}>
        <TouchableOpacity style={styles.mediaPlaceholder} onPress={pickMedia}>
          {media ? (
            media.type.startsWith('image') ? (
              <Image source={{ uri: media.uri }} style={styles.media} />
            ) : (
              <Video
                source={{ uri: media.uri }}
                style={styles.media}
                resizeMode="cover"
                shouldPlay
                isLooping
              />
            )
          ) : (
            <Ionicons name="image" size={50} color="gray" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={pickMedia}>
          <Text style={styles.selectMediaText}>Select Picture/Video</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.captionContainer}>
        <TextInput
          style={styles.captionInput}
          placeholder="Write a caption..."
          placeholderTextColor="#888"
          multiline
          value={caption}
          onChangeText={setCaption}
        />
        <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    marginTop: 30,
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 12,
    color: 'white',
  },
  headerTitle: {
    fontSize: 16,
    color: '#fff',
  },
  mediaPickerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
  },
  mediaPlaceholder: {
    width: 350,
    height: 400,
    borderWidth: 2,
    borderColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  selectMediaText: {
    color: 'white',
    textTransform: 'capitalize',
    marginTop: 10,
  },
  captionContainer: {
    width: '100%',
    marginTop: 40,
  },
  captionInput: {
    width: '100%',
    height: 100,
    backgroundColor: '#444',
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 5,
    padding: 10,
    color: '#fff',
  },
  postButton: {
    width: '100%',
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  postButtonText: {
    color: '#fff',
  },
});

export default PostScreen;
