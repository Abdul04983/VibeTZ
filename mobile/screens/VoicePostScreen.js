import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import * as Speech from 'expo-speech';

export default function VoicePostScreen() {
  const [text, setText] = useState('');
  const [spoken, setSpoken] = useState(false);

  const speak = () => {
    if(text.trim()) {
      Speech.speak(text, {
        onDone: () => setSpoken(true),
        onError: () => setSpoken(false),
      });
      setSpoken(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder='Write something to speak...'
        value={text}
        onChangeText={setText}
        multiline
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, height: 100 }}
      />
      <Button title='Speak Text' onPress={speak} />
      {spoken && <Text style={{ marginTop: 10, color: 'green' }}>Finished Speaking!</Text>}
    </View>
  );
}
