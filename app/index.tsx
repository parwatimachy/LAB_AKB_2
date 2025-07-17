import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';

// Tipe data untuk gambar
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

// Komponen satu gambar
const GridImage: React.FC<{ item: ImageItem; size: number }> = ({ item, size }) => {
  const [useAlt, setUseAlt] = useState(false);
  const [scale, setScale] = useState(1);
  const [error, setError] = useState(false);

  const handlePress = () => {
    setUseAlt((prev) => !prev);
    setScale((prev) => {
      const newScale = parseFloat((prev * 1.2).toFixed(2));
      return newScale > 2 ? 1 : newScale; // Batas maksimum 2x, lalu reset
    });
    setError(false); // Reset error saat coba gambar lagi
  };

  const onError = () => {
    setError(true);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ width: size, height: size }}>
      {error ? (
        <View style={[styles.image, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: 'white', fontSize: 12 }}>Gagal dimuat</Text>
        </View>
      ) : (
        <Image
          source={{ uri: useAlt ? item.alt : item.main }}
          onError={onError}
          style={[
            styles.image,
            {
              transform: [{ scale }],
              width: size,
              height: size,
            },
          ]}
          resizeMode="cover"
        />
      )}
    </TouchableOpacity>
  );
};

const App: React.FC = () => {
  const screenWidth = Dimensions.get('window').width;
  const itemSize = screenWidth / 3;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={IMAGE_LIST}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GridImage item={item} size={itemSize} />}
        contentContainerStyle={styles.grid}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 6,
    backgroundColor: '#222',
  },
});
