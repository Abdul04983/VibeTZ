import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';

const MusicScreen = () => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const streamUrl = "https://your-vibe-radio-stream-url.com/live"; // replace with actual stream URL

  const playStream = async () => {
    setLoading(true);
    const { sound } = await Audio.Sound.createAsync(
      { uri: streamUrl },
      { shouldPlay: true }
    );
    setSound(sound);
    setIsPlaying(true);
    setLoading(false);
  };

  const stopStream = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>?? Vibe Radio</Text>
      {loading && <ActivityIndicator size="large" color="#00ffcc" />}
      <Button title={isPlaying ? "? Stop" : "?? Play"} onPress={isPlaying ? stopStream : playStream} />
    </View>
  );
};

export default MusicScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#111' },
  title: { fontSize: 24, marginBottom: 20, color: 'white' }
});
