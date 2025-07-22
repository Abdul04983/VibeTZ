import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

export default function DuoVibesScreen() {
  const [post1, setPost1] = useState("");
  const [post2, setPost2] = useState("");

  const submitDuoVibe = async () => {
    if (!post1 || !post2) {
      Alert.alert("Error", "Please fill both posts");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/duovibes", { post1, post2 });
      Alert.alert("Success", "DuoVibe posted!");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DuoVibes – Collaborative Posts</Text>
      <TextInput
        placeholder="Post from User 1"
        style={styles.input}
        value={post1}
        onChangeText={setPost1}
      />
      <TextInput
        placeholder="Post from User 2"
        style={styles.input}
        value={post2}
        onChangeText={setPost2}
      />
      <Button title="Submit DuoVibe" onPress={submitDuoVibe} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10 },
});
