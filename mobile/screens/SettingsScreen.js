import React, { useState } from 'react';
import { View, Text, Switch, Picker, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [voicePost, setVoicePost] = useState(true);
  const [language, setLanguage] = useState('en');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.option}>
        <Text style={styles.label}>Dark Theme</Text>
        <Switch value={darkTheme} onValueChange={setDarkTheme} />
      </View>

      <View style={styles.option}>
        <Text style={styles.label}>Auto Translate</Text>
        <Switch value={autoTranslate} onValueChange={setAutoTranslate} />
      </View>

      <View style={styles.option}>
        <Text style={styles.label}>Voice Post</Text>
        <Switch value={voicePost} onValueChange={setVoicePost} />
      </View>

      <View style={styles.option}>
        <Text style={styles.label}>Language</Text>
        <Picker
          selectedValue={language}
          onValueChange={setLanguage}
          style={styles.picker}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Swahili" value="sw" />
          <Picker.Item label="French" value="fr" />
          {/* Add more languages here */}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  option: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  label: { fontSize: 18 },
  picker: { height: 50, width: 150 },
});
