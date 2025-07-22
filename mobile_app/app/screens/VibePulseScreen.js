import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function VibePulseScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vibe Pulse Screen - Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#fff" },
  text: { fontSize:18, color:"#333" }
});
