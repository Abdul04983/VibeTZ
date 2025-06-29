import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const sampleChallenges = [
  { id: '1', title: 'Caption Challenge', description: 'Write the best caption and win!' },
  { id: '2', title: 'Dance Challenge', description: 'Show off your moves!' },
  { id: '3', title: 'Voice Challenge', description: 'Record your coolest voice clip.' }
];

const VibeChallengeScreen = () => {
  const [challenges, setChallenges] = useState(sampleChallenges);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const addChallenge = () => {
    if (newTitle.trim() && newDesc.trim()) {
      setChallenges([
        ...challenges,
        { id: (challenges.length + 1).toString(), title: newTitle, description: newDesc }
      ]);
      setNewTitle('');
      setNewDesc('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Vibe Challenges</Text>
      <TextInput
        style={styles.input}
        placeholder="Challenge Title"
        value={newTitle}
        onChangeText={setNewTitle}
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Challenge Description"
        value={newDesc}
        onChangeText={setNewDesc}
        multiline
      />
      <Button title="Add Challenge" onPress={addChallenge} />
      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.challengeCard}>
            <Text style={styles.challengeTitle}>{item.title}</Text>
            <Text style={styles.challengeDesc}>{item.description}</Text>
          </TouchableOpacity>
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default VibeChallengeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  },
  challengeCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  challengeTitle: { fontSize: 18, fontWeight: 'bold' },
  challengeDesc: { fontSize: 14, marginTop: 5 }
});
