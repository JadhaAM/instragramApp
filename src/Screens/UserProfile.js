import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const apiUrl = process.env.EXPO_PUBLIC_SERVER_URL;

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const { user: contextUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/profile`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true // Ensure cookies are sent with the request
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching userProfile:', error);
      }
    };

    if (!contextUser) {
      fetchUser();
    }
  }, [contextUser]);

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
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
        <Image style={styles.profileImage} source={{ uri: `${apiUrl}/images/updates/${user.profileImage}` }} />
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text>{user.posts ? user.posts.length : 0}</Text>
            <Text>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text>322</Text>
            <Text>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text>120</Text>
            <Text>Following</Text>
          </View>
        </View>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.followButton]} onPress={() => { }}>
          <Text style={styles.buttonText}>Follow</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.postsContainer}>
        {user.posts.map((elem) => (
          <View key={elem.id} style={styles.post}>
            <Image style={styles.postImage} source={{ uri: `${apiUrl}/images/updates/${elem.picture}` }} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    paddingHorizontal: 4,
  },
  username: {
    fontSize: 16,
    color: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  iconText: {
    fontSize: 14,
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
    backgroundColor: '#ebf8ff',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bioContainer: {
    paddingHorizontal: 6,
    marginTop: 5,
  },
  name: {
    fontSize: 16,
    marginBottom: 1,
  },
  bio: {
    fontSize: 10,
    opacity: 0.5,
    color: 'white',
  },
  actionsContainer: {
    paddingHorizontal: 6,
    marginTop: 5,
  },
  button: {
    paddingHorizontal: 3,
    paddingVertical: 2,
    backgroundColor: '#1a202c',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 10,
    color: 'white',
  },
  followButton: {
    marginTop: 5,
  },
  postsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 1,
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
