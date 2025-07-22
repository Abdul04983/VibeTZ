import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';

const VoicePostScreen = () => {
  const [text, setText] = useState('');

  const speak = () => {
    if (text) {
      Speech.speak(text);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Voice Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Type something..."
        value={text}
        onChangeText={setText}
        multiline
      />
      <Button title="?? Speak it" onPress={speak} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, minHeight: 100, marginBottom: 20 }
});

export default VoicePostScreen;
