import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const games = [
  { id: '1', title: ' Football 1v1' },
  { id: '2', title: ' Pool Duel' },
  { id: '3', title: ' Checkers' }
];

export default function ArenaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Vibe Arena</Text>
      <FlatList
        data={games}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.gameText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { padding: 20, backgroundColor: '#eee', marginBottom: 10, borderRadius: 10 },
  gameText: { fontSize: 18 },
});
