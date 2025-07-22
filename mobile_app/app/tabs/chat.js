import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import io from 'socket.io-client';

const socket = io("http://localhost:5000");

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    if (text.trim()) {
      const message = { text, senderId: "user1", receiverId: "user2" };
      socket.emit('sendMessage', message);
      setMessages((prev) => [...prev, message]);
      setText("");
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ padding: 5 }}>{item.senderId}: {item.text}</Text>
        )}
      />
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Andika ujumbe..."
        style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
      />
      <Button title="Tuma" onPress={sendMessage} />
    </View>
  );
}
