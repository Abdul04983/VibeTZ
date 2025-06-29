import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

const FootballGame = () => {
  const [score, setScore] = useState({ me: 0, opponent: 0 });
  const [playing, setPlaying] = useState(false);

  const startGame = () => {
    setScore({ me: 0, opponent: 0 });
    setPlaying(true);
    Alert.alert('Game Started', 'You are now playing Football 1v1!');
  };

  const simulatePlay = () => {
    const meGoal = Math.random() > 0.5;
    if (meGoal) {
      setScore(prev => ({ ...prev, me: prev.me + 1 }));
    } else {
      setScore(prev => ({ ...prev, opponent: prev.opponent + 1 }));
    }
  };

  const endGame = () => {
    setPlaying(false);
    const result = score.me > score.opponent ? 'You Win!' : score.me === score.opponent ? 'Draw' : 'You Lose!';
    Alert.alert('Game Over', result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Football 1v1</Text>
      <Text style={styles.score}>You: {score.me} - Opponent: {score.opponent}</Text>

      {playing ? (
        <>
          <Button title="Kick Ball!" onPress={simulatePlay} />
          <Button title="End Game" onPress={endGame} color="red" />
        </>
      ) : (
        <Button title="Start Match" onPress={startGame} />
      )}
    </View>
  );
};

export default FootballGame;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  score: { fontSize: 20, marginVertical: 20 }
});
