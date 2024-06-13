import React, { useRef, useState } from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const { height } = Dimensions.get('window');


const videos = [
  { id: '1', uri: 'https://youtube.com/shorts/jhJ9Lfn7w8s?si=E5YAgQSJmvivMyFs' },
  { id: '2', uri: 'https://youtube.com/shorts/S7xrBIDdO7M?si=WSM4xhZLpi4Gq48l' },
 
];

const ReelsScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
      
    }
  }).current;

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <View style={styles.videoContainer}>
          {index === currentIndex && (
            <Video
              source={{ uri: item.uri }}
              style={styles.video}
              resizeMode="cover"
              shouldPlay
              isLooping
              isMuted={false}
              volume={1.0}
            />
          )}
        </View>
      )}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    height,
    width: '100%',
  },
});

export default ReelsScreen;
