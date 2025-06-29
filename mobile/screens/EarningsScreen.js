import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

export default function EarningsScreen() {
  const [earningsData, setEarningsData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/earnings/me')
      .then(res => setEarningsData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!earningsData) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Earnings Summary</Text>
      <Text style={styles.total}>Total Earnings: Tsh {earningsData.totalEarnings}</Text>
      <Text style={styles.views}>Total Views: {earningsData.totalViews}</Text>

      <FlatList
        data={earningsData.posts}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.caption}>{item.caption}</Text>
            <Text style={styles.earning}>Earned: Tsh {item.earning}</Text>
            <Text style={styles.views}>Views: {item.views}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  total: { fontSize: 20, marginBottom: 5 },
  views: { fontSize: 18, marginBottom: 15 },
  item: { marginBottom: 15, padding: 10, backgroundColor: '#e0f2f1', borderRadius: 8 },
  caption: { fontSize: 16, fontWeight: '600' },
  earning: { fontSize: 14, color: '#388e3c' },
});
