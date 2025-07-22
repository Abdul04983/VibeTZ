import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://192.168.8.100:5000/api/posts/timeline');
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts();
  }, []);

  if (loading) {
    return <ActivityIndicator size='large' style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (posts.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Hakuna posts mpaka sasa.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      renderItem={({ item }) => (
        <View style={styles.post}>
          <Text style={styles.title}>{item.desc}</Text>
          <Text style={styles.user}>User ID: {item.userId}</Text>
        </View>
      )}
    />
  );
};

import { getTextColor } from "../utils/theme";`nconst styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  post: { padding: 15, borderBottomWidth: 1, borderColor: '#ddd' },
  title: { fontSize: 16, fontWeight: 'bold' },
  user: { fontSize: 12, color: '#555' },
});

export default HomeScreen;
