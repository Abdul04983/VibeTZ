import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import io from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

export default function BlackChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(SOCKET_URL + "/blackchat");

    socket.current.on("connect", () => {
      console.log("Connected to Black Chat");
    });

    socket.current.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== "") {
      socket.current.emit("chatMessage", { text: input, timestamp: Date.now() });
      setInput("");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text style={styles.text}>{item.text}</Text>
            <Text style={styles.time}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type anonymously..."
          style={styles.input}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  message: { backgroundColor: "#222", padding: 10, marginVertical: 5, borderRadius: 5 },
  text: { color: "#eee" },
  time: { color: "#888", fontSize: 10, marginTop: 5, textAlign: "right" },
  inputContainer: { flexDirection: "row", alignItems: "center" },
  input: { flex: 1, borderColor: "#666", borderWidth: 1, borderRadius: 5, padding: 8, marginRight: 10, color: "#eee" },
});
