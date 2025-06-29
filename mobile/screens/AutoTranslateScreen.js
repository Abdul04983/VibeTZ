import React, { useState } from 'react';
import { View, TextInput, Button, Text, Picker, StyleSheet } from 'react-native';

export default function AutoTranslateScreen() {
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  const [targetLang, setTargetLang] = useState('sw');

  const translateText = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auto-translate/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLang }),
      });
      const data = await res.json();
      setTranslated(data.translated);
    } catch (e) {
      setTranslated('Translation error');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Andika hapa...'
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Picker selectedValue={targetLang} onValueChange={setTargetLang} style={styles.picker}>
        <Picker.Item label='Kiswahili' value='sw' />
        <Picker.Item label='English' value='en' />
        <Picker.Item label='French' value='fr' />
      </Picker>
      <Button title='Tafsiri' onPress={translateText} />
      <Text style={styles.result}>{translated}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { height: 100, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8 },
  picker: { height: 50, width: '100%', marginBottom: 12 },
  result: { marginTop: 20, fontSize: 16, fontWeight: 'bold' },
});
