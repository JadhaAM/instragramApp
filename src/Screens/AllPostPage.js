import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const posts = [
  // Sample post data
  {
    id: 1,
    username: 'ramPunde34__1',
    profileImage: 'https://path/to/profile/image.jpg',
    postImage: 'https://images.freeimages.com/images/large-previews/636/holding-a-dot-com-iii-1411477.jpg?fmt=webp&w=500',
    likes: 27,
    time: '1d',
    caption: 'Happy Anniversary Dear Aho'
  }
  ,{
    id: 2,
    username: 'A_j6198',
    profileImage: '/images/updates/image.png',
    postImage: '/images/updates/image.png',
    likes: 57,
    time: '1d',
    caption: 'Rocking Start'
  }
  ,
  {
    id: 3,
    username: 'tushargade_321',
    profileImage: 'https://path/to/profile/image.jpg',
    postImage: 'https://path/to/post/image.jpg',
    likes: 27,
    time: '1d',
    caption: 'Happy Anniversary Dear Aho'
  }
];

const AllPostScreen = () => {

  const handleLike = (postId) => {
    fetch(`/like/post/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => {
        console.log('Response:', response);
        return response.json();
      })
      .then((data) => {
        console.log('Data after like:', data);
      })
      .catch((error) => {
        console.error('Error liking post:', error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      {posts.map((post) => (
        <View key={post.id} style={styles.postContainer}>
          <View style={styles.header}>
            <Image source={{ uri: post.profileImage }} style={styles.profileImage} />
            <View style={styles.headerText}>
              <Text style={styles.username}>{post.username}</Text>
              <Text style={styles.timestamp}>{post.time}</Text>
            </View>
            <Ionicons name="ellipsis-horizontal" style={styles.moreIcon} />
          </View>
          <Image source={{ uri: post.postImage }} style={styles.postImage} />
          <View style={styles.actionButtons}>
            <View style={styles.leftActions}>
              <TouchableOpacity onPress={() => handleLike(post.id)}>
                <Ionicons name="heart-outline" style={styles.actionIcon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="chatbubble-outline" style={styles.actionIcon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="paper-plane-outline" style={styles.actionIcon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Ionicons name="bookmark-outline" style={styles.bookmarkIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.likes}>{post.likes} likes</Text>
          <Text style={styles.caption}>
            <Text style={styles.captionUsername}>{post.username}</Text> {post.caption}
          </Text>
        </View>
      ))}
    </ScrollView>
    
  );
};

export default AllPostScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  postContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  timestamp: {
    color: '#888',
  },
  moreIcon: {
    fontSize: 24,
    color: '#888',
  },
  postImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionIcon: {
    fontSize: 28,
    marginRight: 15,
  },
  bookmarkIcon: {
    fontSize: 28,
  },
  likes: {
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  caption: {
    marginHorizontal: 10,
  },
  captionUsername: {
    fontWeight: 'bold',
  },
});
