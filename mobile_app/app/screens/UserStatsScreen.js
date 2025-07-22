import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserStatsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>?? User Statistics</Text>
      <Text style={styles.stat}>Followers: 0</Text>
      <Text style={styles.stat}>Following: 0</Text>
      <Text style={styles.stat}>Monthly Engagement: 0%</Text>
      <Text style={styles.stat}>Top Fans: N/A</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    color: '#0ff',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  stat: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default UserStatsScreen;
