import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/aitwin';

export default function AITwinScreen() {
  const [userId, setUserId] = useState('');
  const [personalityData, setPersonalityData] = useState('');
  const [trainingData, setTrainingData] = useState('');
  const [response, setResponse] = useState(null);

  const updateTwin = async () => {
    try {
      const pd = JSON.parse(personalityData);
      const td = JSON.parse(trainingData);
      const res = await axios.post(\\/update\, {
        user: userId,
        personalityData: pd,
        trainingData: td,
      });
      setResponse(res.data);
    } catch (error) {
      alert('Invalid JSON or server error');
    }
  };

  const getTwin = async () => {
    try {
      const res = await axios.get(\\/\\);
      setResponse(res.data);
      setPersonalityData(JSON.stringify(res.data.personalityData, null, 2));
      setTrainingData(JSON.stringify(res.data.trainingData, null, 2));
    } catch (error) {
      alert('User not found or server error');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI Vibe Twin</Text>
      <TextInput placeholder='User ID' value={userId} onChangeText={setUserId} style={styles.input} />
      <TextInput
        placeholder='Personality Data (JSON)'
        value={personalityData}
        onChangeText={setPersonalityData}
        multiline
        style={styles.textArea}
      />
      <TextInput
        placeholder='Training Data (JSON Array)'
        value={trainingData}
        onChangeText={setTrainingData}
        multiline
        style={styles.textArea}
      />
      <Button title='Update AI Twin' onPress={updateTwin} />
      <Button title='Get AI Twin' onPress={getTwin} />
      {response && (
        <View style={styles.responseBox}>
          <Text>{JSON.stringify(response, null, 2)}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
  textArea: { borderWidth: 1, marginBottom: 10, padding: 8, height: 100 },
  responseBox: { marginTop: 15, padding: 10, backgroundColor: '#eee' },
});
