import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const DuoVibeList = ({ navigation }) => {
  const [duoVibes, setDuoVibes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDuoVibes = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const user = JSON.parse(userData);
        const res = await axios.get(\/api/duovibes/user/\\);
        setDuoVibes(res.data);
      } catch (err) {
        console.error('Failed to load DuoVibes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDuoVibes();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('DuoVibeView', { duoVibeId: item._id })}>
      <Text style={styles.caption}>DuoVibe #{item._id}</Text>
      <Text>{item.post1.caption?.substring(0, 50) || 'Post1'}</Text>
      <Text>{item.post2.caption?.substring(0, 50) || 'Post2'}</Text>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;

  if (duoVibes.length === 0) return <Text style={{ margin: 20 }}>No DuoVibes found.</Text>;

  return (
    <FlatList
      data={duoVibes}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 10 }}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#eee',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8
  },
  caption: {
    fontWeight: 'bold',
    marginBottom: 5
  }
});

export default DuoVibeList;
