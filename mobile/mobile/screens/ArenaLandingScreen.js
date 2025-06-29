import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ArenaLandingScreen() {
  return (
    <View style={styles.container}>
      <Text>Arena Landing Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
