import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const DuoVibeScreen = () => {
  const [caption, setCaption] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const pickImage = async (setter) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setter(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    // Logic to upload caption and both images as a collaborative post
    alert('DuoVibe post created!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> DuoVibe Collaboration</Text>
      <TextInput
        style={styles.input}
        placeholder="Write a joint caption..."
        value={caption}
        onChangeText={setCaption}
      />
      <View style={styles.imageRow}>
        <TouchableOpacity onPress={() => pickImage(setImage1)} style={styles.imagePicker}>
          {image1 ? <Image source={{ uri: image1 }} style={styles.image} /> : <Text>Pick Image 1</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage(setImage2)} style={styles.imagePicker}>
          {image2 ? <Image source={{ uri: image2 }} style={styles.image} /> : <Text>Pick Image 2</Text>}
        </TouchableOpacity>
      </View>
      <Button title="Post DuoVibe" onPress={handlePost} />
    </View>
  );
};

export default DuoVibeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 20 },
  imageRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  imagePicker: { flex: 1, height: 150, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center', marginHorizontal: 5, borderRadius: 8 },
  image: { width: '100%', height: '100%', borderRadius: 8 }
});
