import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const CoinWalletScreen = ({ route }) => {
  const userId = route.params?.userId;
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      const res = await axios.get(http://localhost:5000/api/coins/wallet/);
      setCoins(res.data.balance);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch coin balance');
    }
  };

  const earnCoins = async () => {
    try {
      await axios.post(http://localhost:5000/api/coins/earn, { userId, amount: 10 });
      fetchCoins();
      Alert.alert('Success', 'You earned 10 VibeCoins!');
    } catch (error) {
      Alert.alert('Error', 'Failed to earn coins');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VibeCoins Wallet</Text>
      <Text style={styles.balance}>Balance: {coins}</Text>
      <Button title="Earn 10 Coins" onPress={earnCoins} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  balance: { fontSize: 20, marginBottom: 20 },
});

export default CoinWalletScreen;
