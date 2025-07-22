import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Button, StyleSheet, Picker, Alert, ScrollView } from "react-native";
import { Audio } from "expo-av";
import { BACKEND_URL } from "../utils/config";

const VoicePostScreen = () => {
  const [text, setText] = useState("");
  const [languageCode, setLanguageCode] = useState("en-US");
  const [gender, setGender] = useState("NEUTRAL");
  const [audioUri, setAudioUri] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const sound = useRef(null);

  const languages = [
    { code: "en-US", label: "English (US)" },
    { code: "sw-KE", label: "Swahili (Kenya)" },
    { code: "fr-FR", label: "French" },
    { code: "de-DE", label: "German" },
    { code: "ja-JP", label: "Japanese" }
  ];

  const genders = [
    { value: "NEUTRAL", label: "Neutral" },
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" }
  ];

  useEffect(() => {
    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  const generateAudio = async () => {
    if (!text.trim()) {
      Alert.alert("Error", "Please enter some text.");
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/voicepost/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, languageCode, gender })
      });
      const data = await response.json();
      if (data.audioUrl) {
        setAudioUri(`${BACKEND_URL}${data.audioUrl}`);
      } else {
        Alert.alert("Error", "Failed to generate audio.");
      }
    } catch (error) {
      Alert.alert("Error", "Network error or server error.");
    }
  };

  const playAudio = async () => {
    try {
      if (sound.current) {
        await sound.current.unloadAsync();
        sound.current = null;
      }
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
      sound.current = newSound;
      await newSound.playAsync();
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isPlaying) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      Alert.alert("Error", "Failed to play audio.");
    }
  };

  const stopAudio = async () => {
    if (sound.current) {
      await sound.current.stopAsync();
      setIsPlaying(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>VoicePost - Text to Speech</Text>

      <TextInput
        style={styles.input}
        placeholder="Andika hapa..."
        multiline
        value={text}
        onChangeText={setText}
      />

      <Text style={styles.label}>Chagua Lugha:</Text>
      <Picker selectedValue={languageCode} onValueChange={(itemValue) => setLanguageCode(itemValue)}>
        {languages.map((lang) => (
          <Picker.Item key={lang.code} label={lang.label} value={lang.code} />
        ))}
      </Picker>

      <Text style={styles.label}>Chagua Sauti ya:</Text>
      <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)}>
        {genders.map((g) => (
          <Picker.Item key={g.value} label={g.label} value={g.value} />
        ))}
      </Picker>

      <View style={styles.buttonContainer}>
        <Button title="Generate Audio" onPress={generateAudio} />
      </View>

      {audioUri && (
        <View style={styles.audioControls}>
          <Button title={isPlaying ? "Stop" : "Play"} onPress={isPlaying ? stopAudio : playAudio} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { height: 150, borderColor: "#ccc", borderWidth: 1, padding: 10, marginBottom: 20, textAlignVertical: "top" },
  label: { fontWeight: "bold", marginBottom: 5 },
  buttonContainer: { marginVertical: 10 },
  audioControls: { marginTop: 20 }
});

export default VoicePostScreen;
