import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';

type ImageItem = {
  id: string;
  main: string;
  alt: string;
};

const MAIN_IMAGES: string[] = [
  'https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg',
  'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
  'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
  'https://images.pexels.com/photos/672916/pexels-photo-672916.jpeg',
  'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
  'https://images.pexels.com/photos/2847648/pexels-photo-2847648.jpeg',
  'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
  'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
  'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
];

const ALT_IMAGES: string[] = [
  'https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg',
  'https://images.pexels.com/photos/415687/pexels-photo-415687.jpeg',
  'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg',
  'https://images.pexels.com/photos/25284/pexels-photo-25284.jpg',
  'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg',
  'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg',
  'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg',
  'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg',
  'https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg',
];

const IMAGE_LIST: ImageItem[] = MAIN_IMAGES.map((main, index) => ({
  id: index.toString(),
  main,
  alt: ALT_IMAGES[index],
}));

const GridImage: React.FC<{ item: ImageItem; size: number; index: number }> = ({ item, size, index }) => {
  const [useAlt, setUseAlt] = useState(false);
  const [scale, setScale] = useState(1);
  const [error, setError] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    setUseAlt((prev) => !prev);
    setScale((prev) => {
      const next = prev * 1.2;
      return next > 2 ? 1 : parseFloat(next.toFixed(2));
    });
  };

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [useAlt, error]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.imageWrapper, { width: size, height: size }]}
    >
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Gambar {index + 1}</Text>
      </View>
      {!error ? (
        <Animated.Image
          source={{ uri: useAlt ? item.alt : item.main }}
          style={[styles.image, { transform: [{ scale }], opacity: fadeAnim }]}
          resizeMode="cover"
          onError={() => setError(true)}
        />
      ) : (
        <View style={[styles.image, styles.errorImage]}>
          <Text style={styles.errorText}>Gagal Memuat</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const App: React.FC = () => {
  const screenWidth = Dimensions.get('window').width;
  const itemSize = screenWidth / 3 - 12;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollArea}>
        <View style={styles.grid}>
          {IMAGE_LIST.map((item, index) => (
            <GridImage key={item.id} item={item} size={itemSize} index={index} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  scrollArea: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageWrapper: {
    margin: 6,
    borderRadius: 10,
    backgroundColor: '#222',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  errorImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',
  },
  errorText: {
    color: '#fff',
    fontSize: 12,
  },
  labelContainer: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  labelText: {
    color: '#fff',
    fontSize: 12,
  },
});
