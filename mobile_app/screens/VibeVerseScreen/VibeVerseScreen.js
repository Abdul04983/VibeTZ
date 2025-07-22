import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";

const places = [
  { title: "Arena", desc: "Multiplayer games & tournaments", image: "https://i.imgur.com/7yUvePI.png" },
  { title: "DuoVibes House", desc: "Create collab content with friends", image: "https://i.imgur.com/kjH8Qbg.png" },
  { title: "Translate Tower", desc: "Translate global content", image: "https://i.imgur.com/UpYJusZ.png" },
  { title: "Black Chat Room", desc: "Anonymous zone", image: "https://i.imgur.com/nA8gEXs.png" },
];

export default function VibeVerseScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>?? Welcome to VibeVerse</Text>
      {places.map((place, index) => (
        <TouchableOpacity key={index} style={styles.card}>
          <Image source={{ uri: place.image }} style={styles.image} />
          <Text style={styles.name}>{place.title}</Text>
          <Text style={styles.desc}>{place.desc}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: { marginBottom: 20, backgroundColor: "#eee", borderRadius: 10, overflow: "hidden", width: "100%" },
  image: { width: "100%", height: 180 },
  name: { fontSize: 18, fontWeight: "bold", padding: 10 },
  desc: { fontSize: 14, paddingHorizontal: 10, paddingBottom: 10 },
});
