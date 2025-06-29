import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BlackChatScreen() {
  return (
    <View style={styles.container}>
      <Text>Black Chat Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
