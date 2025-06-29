import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';

export default function CreatePostScreen() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = () => {
    // Implement image picker here
  };

  const handlePost = () => {
    // Implement post submission here
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Write a caption...'
        value={caption}
        onChangeText={setCaption}
      />
      <Button title='Pick an image' onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title='Post' onPress={handlePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10 },
  image: { width: '100%', height: 200, marginVertical: 10 },
});
