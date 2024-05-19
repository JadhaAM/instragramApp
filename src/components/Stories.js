
import { View, ScrollView, Image, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const stories = [
  { id: '1', uri: 'https://unsplash.com/photos/macbook-pro-turned-on-Bd7gNnWJBkU', name: 'Your story' },
  { id: '2', uri: 'https://via.placeholder.com/150', name: 'tushargade_01 ' },
  { id: '3', uri: 'https://via.placeholder.com/150', name: 'sanket_aswar123' },
  { id: '4', uri: 'https://via.placeholder.com/150', name: 'sachin' },
  { id: '5', uri: 'https://via.placeholder.com/150', name: 'rohan.khose' },
  { id: '6', uri: 'https://via.placeholder.com/150', name: 'g.a.n.e.s.h.' },
  { id: '7', uri: 'https://via.placeholder.com/150', name: 'avi_k' },
  { id: '8', uri: 'https://via.placeholder.com/150', name: 'vaibhavRaj' },
  { id: '9', uri: 'https://via.placeholder.com/150', name: 'ezsnippet' },
  { id: '10', uri: 'https://via.placeholder.com/150', name: 'sigma.vibess' },
];

const Stories = () => {
  return (
    <View style={styles.storiesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {stories.map((story) => (
          <View key={story.id} style={styles.story}>
            <LinearGradient
              colors={['#FF0000',  '#FFFF00',]}
              style={styles.gradientBorder}
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: story.uri }} style={styles.storyImage} />
              </View>
            </LinearGradient>
            <Text style={styles.storyText}>{story.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  storiesContainer: {
    backgroundColor: '#000',
    paddingVertical: 10,
  },
  story: {
    alignItems: 'center',
    marginRight: 10,
  },
  gradientBorder: {
    padding: 3, 
    borderRadius: 33, 
  },
  imageContainer: {
    backgroundColor: 'white', 
    borderRadius: 30,
    padding: 2, 
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  storyText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 12,
  },
});

export default Stories;
