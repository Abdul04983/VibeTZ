import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://';

export default function MiniGamesScreen() {
  const [games, setGames] = useState([]);
  const [playerId, setPlayerId] = useState('player_' + Math.floor(Math.random() * 1000));
  const [sessionIdInput, setSessionIdInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    axios.get(\\/api/miniGames/games\)
      .then(res => setGames(res.data))
      .catch(err => console.error('Failed to load games:', err));
  }, []);

  useEffect(() => {
    if (sessionId) {
      socketRef.current = io(SOCKET_SERVER_URL);

      socketRef.current.emit('joinRoom', { sessionId, playerId });

      socketRef.current.on('playerJoined', ({ playerId: newPlayer, players }) => {
        setPlayers(players);
        setMessages(prev => [...prev, \\ joined the game\]);
      });

      socketRef.current.on('gameAction', (action) => {
        setMessages(prev => [...prev, \Action: \\]);
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [sessionId]);

  const createSession = (gameId) => {
    axios.post(\\/api/miniGames/games/create\, { gameId, playerId })
      .then(res => {
        Alert.alert('Success', \Session created: \\);
        setSessionId(res.data.sessionId);
      })
      .catch(err => Alert.alert('Error', err.response?.data?.error || err.message));
  };

  const joinSession = () => {
    axios.post(\\/api/miniGames/games/join\, { sessionId: sessionIdInput, playerId })
      .then(res => {
        Alert.alert('Success', 'Joined session!');
        setSessionId(sessionIdInput);
      })
      .catch(err => Alert.alert('Error', err.response?.data?.error || err.message));
  };

  const sendAction = () => {
    if (socketRef.current && sessionId) {
      socketRef.current.emit('gameAction', { sessionId, action: { type: 'exampleMove', playerId } });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Mini-Games</Text>
      <FlatList
        data={games}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.gameButton} onPress={() => createSession(item.id)}>
            <Text style={styles.gameText}>Create {item.name} Session</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.title}>Join Game Session</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter Session ID'
        value={sessionIdInput}
        onChangeText={setSessionIdInput}
      />
      <TouchableOpacity style={styles.joinButton} onPress={joinSession}>
        <Text style={styles.gameText}>Join Session</Text>
      </TouchableOpacity>

      {sessionId && (
        <>
          <Text style={styles.title}>Game Session: {sessionId}</Text>
          <Text>Players: {players.join(', ')}</Text>
          <TouchableOpacity style={styles.actionButton} onPress={sendAction}>
            <Text style={styles.gameText}>Send Action</Text>
          </TouchableOpacity>
          <ScrollView style={styles.messages}>
            {messages.map((msg, i) => (
              <Text key={i} style={styles.messageText}>{msg}</Text>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  gameButton: { padding: 15, backgroundColor: '#4A90E2', marginBottom: 10, borderRadius: 8 },
  gameText: { color: '#fff', fontSize: 18, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  joinButton: { padding: 15, backgroundColor: '#50C878', borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  actionButton: { padding: 15, backgroundColor: '#F39C12', borderRadius: 8, alignItems: 'center', marginVertical: 10 },
  messages: { maxHeight: 150, backgroundColor: '#eee', padding: 10, borderRadius: 8 },
  messageText: { marginBottom: 5 },
});
