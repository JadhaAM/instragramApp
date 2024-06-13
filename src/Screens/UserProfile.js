import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = process.env.EXPO_PUBLIC_SERVER_URL;

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const { token, setToken, setUserId, userId } = useContext(AuthContext);
  const { user: contextUser } = useContext(AuthContext);

  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setToken(null);
      navigation.replace('LoginScreen');
    } catch (error) {
      console.log('Error', error);
    }
  };

  const logout = () => {
    clearAuthToken();
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/profile`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('User data:', response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching userProfile:', error.response ? error.response.data : error.message);
      }
    };

    if (!contextUser) {
      fetchUser();
    } else {
      setUser(contextUser);
    }
  }, [contextUser, token]);

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
        <TouchableOpacity onPress={logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{user.username}</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => { }}>
            <Text style={styles.iconText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.iconText}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.profileContainer}>
        <Image style={styles.profileImage} source={{url:user.profileImage}} />
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.name}>{user.posts ? user.posts.length : 0}</Text>
            <Text style={styles.name}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.name}>{user.followers ? user.followers.length : 0}</Text>
            <Text style={styles.name}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.name}>{user.follwing ? user.follwing.length : 0}</Text>
            <Text style={styles.name}>Following</Text>
          </View>
        </View>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditScreen')}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.followButton]} onPress={() => { }}>
          <Text style={styles.buttonText}>Follow</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.postsContainer}>
        <Image style={styles.postImage} source={require('../../assets/logo.png')} />
        {user.posts.map((elem) => (
          <View key={elem.id} style={styles.post}> 
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
   padding:10,
    marginTop:30,
    backgroundColor: '#1a202c',
    paddingTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'black',
    fontSize: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    gap:5,
  },
  username: {
    fontSize: 36,
    color: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  iconText: {
    fontSize: 34,
    color: 'white',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 6,
    paddingRight: '12vw',
    marginTop: 8,
   
  },
  profileImage: {
    width: '19vw',
    height: '19vw',
    borderRadius: 8,
    overflow: 'hidden',
    borderColor:"red",
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 5,
    padding:20,
    alignItems: 'center',
    justifyContent: 'space-between',
   
    
  },
  stat: {
    alignItems: 'center',
    justifyContent: 'center',
    gap:5,
  },
  bioContainer: {
    paddingHorizontal: 6,
    marginTop: 5,
    color: 'white',
  },
  name: {
    fontSize: 16,
    marginBottom: 1,
    color: 'white',
  },
  bio: {
    fontSize: 10,
    opacity: 0.5,
    color: 'white',
  },
  actionsContainer: {
    paddingHorizontal: 6,
    marginTop: 5,
    flexDirection:"row",
    gap:25
  },
  button: {
   
    paddingHorizontal: 3,
    paddingVertical: 2,
    backgroundColor: '#8D8B8B',
    borderRadius: 4,
    
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  followButton: {
    fontSize: 20,
    marginTop: 5,
  },
  postsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    paddingVertical: 2,
    marginTop: 5,
    
  },
  post: {
    width: '32.5%',
    height: 32,
    backgroundColor: '#ebf8ff',
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default ProfileScreen;
