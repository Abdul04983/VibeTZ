import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { saveOfflineBlackChat, getOfflineBlackChat } from '../utils/offlineBlackChat';
import { monitorBlackChatSync } from '../utils/blackChatSync';
import { apiSendBlackChatMessage } from '../api/blackChat';

const BlackChatScreen = () => {
  const [message, setMessage] = useState('');
  const [isSyncPending, setIsSyncPending] = useState(false);
  const [offlineMessages, setOfflineMessages] = useState([]);

  useEffect(() => {
    monitorBlackChatSync();
    loadOfflineMessages();
  }, []);

  const loadOfflineMessages = async () => {
    const msgs = await getOfflineBlackChat();
    setOfflineMessages(msgs);
    setIsSyncPending(msgs.length > 0);
  };

  const handleSend = async () => {
    const msgData = {
      text: message,
      createdAt: new Date().toISOString(),
    };

    const state = await NetInfo.fetch();

    if (state.isConnected) {
      try {
        await apiSendBlackChatMessage(msgData);
        Alert.alert('Sent', 'Message sent!');
        setMessage('');
        await loadOfflineMessages(); // refresh offline msgs
      } catch (error) {
        await saveOfflineBlackChat(msgData);
        setIsSyncPending(true);
        Alert.alert('Saved Offline', 'Message will send when online.');
      }
    } else {
      await saveOfflineBlackChat(msgData);
      setIsSyncPending(true);
      Alert.alert('Offline', 'Message saved locally. Will send when online.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={offlineMessages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ padding: 8, backgroundColor: '#eee', marginVertical: 4 }}>
            {item.text} {isSyncPending && <Text style={{ color: 'orange' }}>(Sync Pending)</Text>}
          </Text>
        )}
      />
      <TextInput
        placeholder='Write anonymous message...'
        value={message}
        onChangeText={setMessage}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title='Send' onPress={handleSend} />
    </View>
  );
};

export default BlackChatScreen;
