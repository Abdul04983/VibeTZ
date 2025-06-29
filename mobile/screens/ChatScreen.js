import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

export default function ChatScreen({ route }) {
  const { chatId, userId } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    socket.emit('joinChat', chatId);

    socket.on('message', message => {
      setMessages(prev => [...prev, message]);
    });

    // Load initial messages
    axios.get(\http://localhost:5000/api/chats/\/messages\)
      .then(res => setMessages(res.data));

    return () => {
      socket.emit('leaveChat', chatId);
      socket.off('message');
    };
  }, [chatId]);

  const sendMessage = () => {
    if(text.trim()) {
      socket.emit('sendMessage', { chatId, text, sender: userId });
      setText('');
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <Text>{item.sender}: {item.text}</Text>
        )}
      />
      <TextInput
        placeholder="Type a message"
        value={text}
        onChangeText={setText}
        style={{ borderWidth: 1, marginBottom: 5, padding: 5 }}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}
