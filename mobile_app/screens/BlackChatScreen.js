import React, { useState, useEffect } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";

const BlackChatScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blackchat/messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/blackchat/send", { message }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        )}
        inverted
      />
      <TextInput
        style={styles.input}
        placeholder="Andika ujumbe wa siri..."
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Tuma" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  messageBox: {
    backgroundColor: "#ddd",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  messageText: { fontSize: 16 },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});

export default BlackChatScreen;
