import React, { useState } from "react";
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from "react-native";

export default function ChatScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("http://localhost:5000/api/ai-vibetwin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      const botMsg = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errMsg = { sender: "bot", text: "Tatizo kuwasiliana na AI." };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatArea}>
        {messages.map((msg, i) => (
          <Text
            key={i}
            style={msg.sender === "user" ? styles.userText : styles.botText}
          >
            {msg.text}
          </Text>
        ))}
      </ScrollView>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Andika ujumbe..."
        />
        <Button title={loading ? "Inatuma..." : "Tuma"} onPress={sendMessage} disabled={loading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  chatArea: { flex: 1, marginBottom: 10 },
  userText: { textAlign: "right", margin: 5, color: "blue" },
  botText: { textAlign: "left", margin: 5, color: "green" },
  inputArea: { flexDirection: "row", alignItems: "center" },
  input: { flex: 1, borderColor: "gray", borderWidth: 1, borderRadius: 5, padding: 8, marginRight: 10 },
});
