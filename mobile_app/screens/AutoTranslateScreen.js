import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Picker, Alert, ScrollView } from "react-native";
import { BACKEND_URL } from "../utils/config";

const AutoTranslateScreen = () => {
  const [text, setText] = useState("");
  const [targetLang, setTargetLang] = useState("en");
  const [translatedText, setTranslatedText] = useState("");

  const languages = [
    { code: "en", label: "English" },
    { code: "sw", label: "Swahili" },
    { code: "fr", label: "French" },
    { code: "de", label: "German" },
    { code: "ja", label: "Japanese" }
  ];

  const translateText = async () => {
    if (!text.trim()) {
      Alert.alert("Error", "Please enter text to translate.");
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/translate/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLang })
      });
      const data = await response.json();
      if (data.translatedText) {
        setTranslatedText(data.translatedText);
      } else {
        Alert.alert("Error", "Translation failed.");
      }
    } catch (error) {
      Alert.alert("Error", "Network or server error.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Auto Translate Comments & DMs</Text>

      <TextInput
        style={styles.input}
        placeholder="Andika hapa..."
        multiline
        value={text}
        onChangeText={setText}
      />

      <Text style={styles.label}>Chagua Lugha ya Tafsiri:</Text>
      <Picker selectedValue={targetLang} onValueChange={(itemValue) => setTargetLang(itemValue)}>
        {languages.map((lang) => (
          <Picker.Item key={lang.code} label={lang.label} value={lang.code} />
        ))}
      </Picker>

      <View style={styles.buttonContainer}>
        <Button title="Tafsiri" onPress={translateText} />
      </View>

      {translatedText !== "" && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Matokeo ya Tafsiri:</Text>
          <Text style={styles.resultText}>{translatedText}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  input: { height: 150, borderColor: "#ccc", borderWidth: 1, padding: 10, marginBottom: 20, textAlignVertical: "top" },
  label: { fontWeight: "bold", marginBottom: 5 },
  buttonContainer: { marginVertical: 10 },
  resultContainer: { marginTop: 20, backgroundColor: "#f0f0f0", padding: 10, borderRadius: 5 },
  resultLabel: { fontWeight: "bold", marginBottom: 5 },
  resultText: { fontSize: 16 }
});

export default AutoTranslateScreen;
