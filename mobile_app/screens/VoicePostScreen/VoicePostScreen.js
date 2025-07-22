import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import axios from "axios";

export default function VoicePostScreen() {
  const [recording, setRecording] = useState(null);
  const [audioURI, setAudioURI] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      setRecording(recording);
    } catch (err) {
      Alert.alert("Error starting recording", err.message);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioURI(uri);
      setRecording(null);
    } catch (err) {
      Alert.alert("Error stopping recording", err.message);
    }
  };

  const uploadAudio = async () => {
    if (!audioURI) return;

    const formData = new FormData();
    formData.append("audio", {
      uri: audioURI,
      name: "voicePost.m4a",
      type: "audio/m4a",
    });

    try {
      setIsUploading(true);
      const res = await axios.post("http://localhost:5000/api/voiceposts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Alert.alert("Uploaded!", JSON.stringify(res.data));
    } catch (err) {
      Alert.alert("Upload failed", err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>??? Voice Posting</Text>
      <Button title={recording ? "Stop Recording" : "Start Recording"} onPress={recording ? stopRecording : startRecording} />
      {audioURI && <Button title="Upload Voice Post" onPress={uploadAudio} />}
      {isUploading && <ActivityIndicator size="large" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
});
