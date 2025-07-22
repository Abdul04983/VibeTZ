import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function VoicePostScreen() {
  const handleVoicePost = async () => {
    console.log("?? Button clicked!");
    try {
      const res = await axios.post("http://192.168.1.100:5000/api/voicepost", {
        text: "Sauti ya kwanza",
        audio: "sample.mp3",
      });

      if (res.data.success) {
        alert("? VoicePost imefanikiwa!");
      } else {
        alert("?? Haijafanikiwa");
      }
    } catch (error) {
      console.error(error);
      alert("?? Error kutuma VoicePost");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VoicePost</Text>
      <Button title="Tuma VoicePost" onPress={handleVoicePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
