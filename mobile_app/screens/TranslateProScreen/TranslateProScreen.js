import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import axios from "axios";

export default function TranslateProScreen() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("sw");
  const [translated, setTranslated] = useState("");

  const translate = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/translate", {
        text,
        targetLang: language,
      });
      setTranslated(res.data.translatedText);
    } catch (err) {
      alert("Error translating");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>?? Translate Pro</Text>
      <TextInput
        placeholder="Enter text"
        value={text}
        onChangeText={setText}
        style={styles.input}
        multiline
      />
      <TextInput
        placeholder="Language code (e.g. en, sw, fr)"
        value={language}
        onChangeText={setLanguage}
        style={styles.input}
      />
      <Button title="Translate" onPress={translate} />
      {translated ? (
        <View style={styles.output}>
          <Text style={styles.label}>Translation:</Text>
          <Text>{translated}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10 },
  output: { marginTop: 20 },
  label: { fontWeight: "bold" },
});
