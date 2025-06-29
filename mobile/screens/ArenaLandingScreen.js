import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const games = [
  { id: 'football', name: 'Football Game' },
  { id: 'pool', name: 'Pool Game' },
  { id: 'checkers', name: 'Checkers' },
  { id: 'cards', name: 'Cards' },
];

export default function ArenaLandingScreen({ navigation }) {
  const handleGamePress = (gameId) => {
    switch (gameId) {
      case 'football':
        navigation.navigate('FootballGame');
        break;
      // Add other game navigations here as you implement them
      default:
        alert('Game coming soon!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>?? VibeTZ Arena - Games</Text>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.gameItem} onPress={() => handleGamePress(item.id)}>
            <Text style={styles.gameName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  gameItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  gameName: { fontSize: 18 },
});
