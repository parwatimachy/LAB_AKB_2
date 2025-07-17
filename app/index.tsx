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

// Gambar utama dan alternatif
const IMAGES = Array.from({ length: 9 }, (_, i) => ({
  id: i.toString(),
  main: `https://picsum.photos/id/${i + 10}/200`,
  alt: `https://picsum.photos/id/${i + 100}/200`,
}));

// Komponen gambar tunggal
const GridImage = ({ image, size }: { image: any; size: number }) => {
  const [useAlt, setUseAlt] = useState(false);
  const [scale, setScale] = useState(1);
  const [hasError, setHasError] = useState(false);

  const handlePress = () => {
    setUseAlt((prev) => !prev);
    setScale((prevScale) => {
      const nextScale = parseFloat((prevScale * 1.2).toFixed(2));
      return nextScale > 2 ? 1 : nextScale;
    });
    setHasError(false); // Reset error jika klik ulang
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ width: size, height: size }}>
      {hasError ? (
        <View style={[styles.image, { width: size, height: size, justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: '#fff', fontSize: 12 }}>Gagal dimuat</Text>
        </View>
      ) : (
        <Image
          source={{ uri: useAlt ? image.alt : image.main }}
          style={[styles.image, { width: size, height: size, transform: [{ scale }] }]}
          resizeMode="cover"
          onError={() => setHasError(true)}
        />
      )}
    </TouchableOpacity>
  );
};

// Komponen utama
export default function App() {
  const screenWidth = Dimensions.get('window').width;
  const itemSize = screenWidth / 3;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={IMAGES}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GridImage image={item} size={itemSize} />}
        contentContainerStyle={styles.grid}
      />
    </SafeAreaView>
  );
}

// Style
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
