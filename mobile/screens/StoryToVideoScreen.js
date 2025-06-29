import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

export default function StoryToVideoScreen() {
  const [story, setStory] = useState('');
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateVideo = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/story-video/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ story }),
      });
      const data = await res.json();
      setVideoUrl(data.videoUrl);
    } catch (err) {
      alert('Failed to generate video');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Write Your Story</Text>
      <TextInput style={styles.input} multiline numberOfLines={4} value={story} onChangeText={setStory} />
      <Button title=\"Generate Video\" onPress={generateVideo} />
      {loading && <ActivityIndicator size=\"large\" color=\"#0000ff\" />}
      {videoUrl && <Video source={{ uri: videoUrl }} useNativeControls resizeMode=\"contain\" style={{ height: 300, marginTop: 20 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, marginBottom: 8 },
  input: { borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 12 },
});
