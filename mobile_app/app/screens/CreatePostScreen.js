import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const CreatePostScreen = () => {
  const [desc, setDesc] = useState('');

  const handleCreatePost = async () => {
    try {
      const res = await axios.post('http://192.168.8.100:5000/api/posts', {
        userId: '123456789',
        desc,
      });
      if (res.data) {
        Alert.alert('Success', 'Post created!');
        setDesc('');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create post');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Andika maelezo ya post yako'
        value={desc}
        onChangeText={setDesc}
        style={styles.input}
      />
      <Button title='Create Post' onPress={handleCreatePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default CreatePostScreen;
