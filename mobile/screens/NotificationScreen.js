import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import axios from 'axios';

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/notifications')
      .then(res => setNotifications(res.data));
  }, []);

  return (
    <View>
      <FlatList
        data={notifications}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <Text>{item.message}</Text>}
      />
    </View>
  );
}
