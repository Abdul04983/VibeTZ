import React, { useState } from 'react';
import { View, Text, TextInput, Picker, StyleSheet, Button } from 'react-native';

const languages = [
  { label: 'English', value: 'en' },
  { label: 'Swahili', value: 'sw' },
  { label: 'French', value: 'fr' },
  { label: 'Spanish', value: 'es' },
  // Add more languages as needed
];

const TranslateTowerScreen = () => {
  const [text, setText] = useState('');
  const [targetLang, setTargetLang] = useState('en');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = () => {
    // Simulate translation (replace with API call e.g. Google Translate)
    setTranslatedText(\[\] \\);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Translate Tower</Text>
      <TextInput
        style={styles.input}
        placeholder="Type text to translate"
        multiline
        value={text}
        onChangeText={setText}
      />
      <Picker
        selectedValue={targetLang}
        style={styles.picker}
        onValueChange={itemValue => setTargetLang(itemValue)}
      >
        {languages.map(lang => (
          <Picker.Item key={lang.value} label={lang.label} value={lang.value} />
        ))}
      </Picker>
      <Button title="Translate" onPress={handleTranslate} />
      {translatedText ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Translated Text:</Text>
          <Text style={styles.resultText}>{translatedText}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default TranslateTowerScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 8, padding: 10, minHeight: 80, marginBottom: 10 },
  picker: { height: 50, marginBottom: 10 },
  resultContainer: { marginTop: 20, padding: 10, backgroundColor: '#eee', borderRadius: 8 },
  resultLabel: { fontWeight: 'bold', marginBottom: 5 },
  resultText: { fontSize: 16 }
});
