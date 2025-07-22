import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";

const AITwinScreen = () => {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = "123456789"; // Badilisha hii kuwa user halisi kama una auth

  const handleSend = async () => {
    setLoading(true);
    setReply("");
    try {
      const res = await axios.post("http://192.168.8.100:5000/api/aitwin/respond", {
        userId,
        message: input,
      });
      setReply(res.data.reply);

      // Auto-learn
      await axios.post("http://192.168.8.100:5000/api/aitwin/learn", {
        userId,
        message: input,
      });
    } catch (error) {
      console.error(error.message);
      setReply("Kuna tatizo kwenye AI Twin.");
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Uliza kitu kwa Twin wako</Text>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Andika hapa..."
        style={styles.input}
      />
      <Button title="Tuma" onPress={handleSend} />
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
      ) : (
        <Text style={styles.response}>{reply}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  response: { marginTop: 20, fontSize: 16, color: "#444" },
});

export default AITwinScreen;
