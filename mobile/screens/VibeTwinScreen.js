import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const VibeTwinScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', from: 'AI Twin', text: 'Hi! I am your AI Vibe Twin. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now().toString(), from: 'You', text: input }]);
      setInput('');
      // Simulate AI response after delay
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: (Date.now()+1).toString(), from: 'AI Twin', text: 'I got your message: ' + input }
        ]);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> AI Vibe Twin</Text>
      <ScrollView style={styles.chatContainer}>
        {messages.map(msg => (
          <View
            key={msg.id}
            style={[
              styles.message,
              msg.from === 'You' ? styles.userMessage : styles.aiMessage
            ]}
          >
            <Text style={styles.messageText}><Text style={{fontWeight: 'bold'}}>{msg.from}: </Text>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default VibeTwinScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  chatContainer: { flex: 1, marginBottom: 10 },
  message: { marginVertical: 5, padding: 10, borderRadius: 8 },
  userMessage: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  aiMessage: { backgroundColor: '#EEE', alignSelf: 'flex-start' },
  messageText: { fontSize: 16 },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginRight: 10 }
});
