import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";

export default function WalletScreen({ route }) {
  const { token } = route.params;
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");

  const fetchBalance = async () => {
    try {
      const res = await axios.get("http://YOUR_BACKEND_URL/api/wallet/balance", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBalance(res.data.balance);
    } catch {
      Alert.alert("Error", "Failed to fetch balance");
    }
  };

  const handleDeposit = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      Alert.alert("Invalid", "Enter a valid amount");
      return;
    }
    try {
      const res = await axios.post(
        "http://YOUR_BACKEND_URL/api/wallet/deposit",
        { amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBalance(res.data.balance);
      Alert.alert("Success", "Deposit successful");
      setAmount("");
    } catch {
      Alert.alert("Error", "Deposit failed");
    }
  };

  const handleWithdraw = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      Alert.alert("Invalid", "Enter a valid amount");
      return;
    }
    try {
      const res = await axios.post(
        "http://YOUR_BACKEND_URL/api/wallet/withdraw",
        { amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBalance(res.data.balance);
      Alert.alert("Success", "Withdrawal successful");
      setAmount("");
    } catch (e) {
      Alert.alert("Error", e.response?.data?.error || "Withdrawal failed");
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet Balance: {balance} TZS</Text>
      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />
      <Button title="Deposit" onPress={handleDeposit} />
      <View style={{ marginTop: 10 }}>
        <Button title="Withdraw" onPress={handleWithdraw} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  title: { fontSize: 20, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }
});
