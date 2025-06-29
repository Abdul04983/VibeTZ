import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function SmartFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts/smartfeed')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <View style={styles.post}>
          <Text style={styles.username}>{item.user.username}</Text>
          <Text>{item.caption}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  post: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  username: {
    fontWeight: 'bold',
  },
});
