import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const BlackChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/blackchat/messages');
      setMessages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    try {
      await axios.post('http://localhost:5000/api/blackchat/messages', { text: input });
      setInput('');
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type anonymously..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={{color: 'white'}}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#000', padding:10 },
  messageBubble: { backgroundColor:'#222', padding:10, borderRadius:8, marginVertical:5 },
  messageText: { color:'#fff' },
  inputContainer: { flexDirection:'row', marginTop:10 },
  input: { flex:1, backgroundColor:'#111', color:'#fff', paddingHorizontal:10, borderRadius:8 },
  sendButton: { backgroundColor:'#0a84ff', paddingHorizontal:15, justifyContent:'center', borderRadius:8, marginLeft:5 }
});

export default BlackChatScreen;
