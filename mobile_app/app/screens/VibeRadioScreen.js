import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const VibeRadioScreen = () => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const streamUrl = 'https://stream.zeno.fm/xxxxxxxxxxxx'; // Change to actual radio stream URL

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      { uri: streamUrl },
      { shouldPlay: true }
    );
    setSound(sound);
    setIsPlaying(true);
    await sound.playAsync();
  }

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setIsPlaying(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>?? Vibe Radio</Text>
      <Button title={isPlaying ? "Stop Radio" : "Play Radio"} onPress={isPlaying ? stopSound : playSound} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' },
  title: { fontSize: 28, color: '#fff', marginBottom: 20 }
});

export default VibeRadioScreen;
