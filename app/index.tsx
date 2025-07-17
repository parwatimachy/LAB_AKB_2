import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';

// Tipe data untuk satu item gambar
type ImageItem = {
  id: string;
  main: string;
  alt: string;
};

// Gambar utama dan alternatif
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

// Gabungkan menjadi array objek
const IMAGE_LIST: ImageItem[] = MAIN_IMAGES.map((main, index) => ({
  id: index.toString(),
  main,
  alt: ALT_IMAGES[index],
}));

// Komponen gambar individual
const GridImage: React.FC<{ item: ImageItem }> = ({ item }) => {
  const [useAlt, setUseAlt] = useState(false);
  const [scale, setScale] = useState(1);

  const handlePress = () => {
    setUseAlt(!useAlt);
    setScale(prev => {
      const nextScale = prev * 1.2;
      return nextScale > 2 ? 1 : nextScale;
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.imageWrapper}>
      <Image
        source={{ uri: useAlt ? item.alt : item.main }}
        style={[styles.image, { transform: [{ scale }] }]}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

// Komponen utama
const App: React.FC = () => {
  const screenWidth = Dimensions.get('window').width;
  const itemSize = screenWidth / 3; // 3 kolom tetap

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.grid}>
        {IMAGE_LIST.map((item) => (
          <View key={item.id} style={[styles.gridItem, { width: itemSize, height: itemSize }]}>
            <GridImage item={item} />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default App;

// Gaya
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#333',
  },
  imageWrapper: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});
