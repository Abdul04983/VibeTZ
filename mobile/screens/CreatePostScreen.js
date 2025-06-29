import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function CreatePostScreen() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true });
    if (!result.cancelled) setImage(result.uri);
  };

  const handlePost = async () => {
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', {
      uri: image,
      name: 'photo.jpg',
      type: 'image/jpeg'
    });

    await axios.post('http://localhost:5000/api/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    setImage(null); setCaption('');
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Write a caption..." value={caption} onChangeText={setCaption} />
      <Button title="Pick an image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Post" onPress={handlePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10 },
  image: { width: '100%', height: 200, marginVertical: 10 }
});
