import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

export default function BlackChatScreen() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const newMsg = { from: 'you', text: message };
    setChat(prev => [...prev, newMsg]);
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/blackchat/send', { text: newMsg.text });
      const aiResponse = { from: 'shadow', text: res.data.reply };
      setChat(prev => [...prev, aiResponse]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatBox}>
        {chat.map((msg, index) => (
          <Text key={index} style={msg.from === 'you' ? styles.you : styles.shadow}>
            {msg.text}
          </Text>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder='Enter anonymous message...'
        placeholderTextColor='#999'
        value={message}
        onChangeText={setMessage}
      />
      <Button title='Send' onPress={sendMessage} color='#444' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 10 },
  chatBox: { flex: 1, marginBottom: 10 },
  input: {
    borderColor: '#333', borderWidth: 1, color: '#fff',
    padding: 10, borderRadius: 5, marginBottom: 10
  },
  you: { textAlign: 'right', color: '#0f0', marginVertical: 4 },
  shadow: { textAlign: 'left', color: '#f0f', marginVertical: 4 },
});
