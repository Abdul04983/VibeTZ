import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

export default function AutoTranslateScreen() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [targetLang, setTargetLang] = useState("en");

  const handleTranslate = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLang }),
      });
      const data = await response.json();
      setTranslated(data.translated);
    } catch (error) {
      setTranslated("Translation failed");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Andika hapa..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Translate" onPress={handleTranslate} />
      <Text style={styles.result}>{translated}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  result: { marginTop: 20, fontSize: 18 },
});
