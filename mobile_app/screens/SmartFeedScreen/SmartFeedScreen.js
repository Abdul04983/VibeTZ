import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import axios from "axios";

const API_URL = "http://localhost:5000/api/smartfeed";

export default function SmartFeedScreen() {
  const [userId, setUserId] = useState("");
  const [feed, setFeed] = useState([]);
  const [preferences, setPreferences] = useState("");

  const fetchFeed = async () => {
    try {
      const res = await axios.get(`${API_URL}/${userId}`);
      setFeed(res.data);
    } catch (err) {
      alert("Error fetching feed");
    }
  };

  const updatePrefs = async () => {
    try {
      const parsed = JSON.parse(preferences);
      await axios.post(`${API_URL}/preferences`, {
        user: userId,
        preferences: parsed,
      });
      alert("Preferences updated");
    } catch (err) {
      alert("Invalid JSON or server error");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Smart Feed</Text>
      <TextInput
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
        style={styles.input}
      />
      <TextInput
        placeholder="Preferences (JSON)"
        value={preferences}
        onChangeText={setPreferences}
        multiline
        style={styles.textArea}
      />
      <Button title="Update Preferences" onPress={updatePrefs} />
      <Button title="Get Feed" onPress={fetchFeed} />

      {feed.map((item, index) => (
        <View key={index} style={styles.feedItem}>
          <Text>{item.caption || "No caption"}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
  textArea: { borderWidth: 1, marginBottom: 10, padding: 8, height: 100 },
  feedItem: { backgroundColor: "#eee", padding: 10, marginVertical: 5 },
});
