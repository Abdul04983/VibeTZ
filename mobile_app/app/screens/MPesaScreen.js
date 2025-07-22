const BACKEND_IP = "192.168.8.100";
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MPesaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MPesa Feature Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  text: {
    fontSize: 18,
    color: "#333"
  }
});
