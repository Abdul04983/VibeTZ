import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, Text } from "react-native";
import axios from "axios";

export default function MpesaPaymentScreen({ route }) {
  const { token } = route.params;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    if (!phoneNumber || !amount || isNaN(amount) || Number(amount) <= 0) {
      Alert.alert("Invalid input", "Please enter valid phone number and amount");
      return;
    }
    try {
      const res = await axios.post(
        "http://YOUR_BACKEND_URL/api/mpesa/initiate",
        { phoneNumber, amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert("Success", "Payment initiated. Transaction ID: " + res.data.transactionId);
    } catch (e) {
      Alert.alert("Error", e.response?.data?.error || "Payment failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>M-Pesa Payment</Text>
      <TextInput
        placeholder="Phone Number (e.g. 2557xxxxxxx)"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Pay with M-Pesa" onPress={handlePayment} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5 },
});
