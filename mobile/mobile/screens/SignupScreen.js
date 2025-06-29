import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = () => {
    // TODO: Add signup logic
    if (!username || !email || !password) {
      setError('Please fill in all fields');
    } else {
      setError('');
      // call backend API here
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize='none'
      />
      <TextInput
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <TextInput
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title='Sign Up' onPress={handleSignup} />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20 },
  input: { borderWidth:1, borderColor:'#ccc', marginBottom:10, padding:8, borderRadius:5 },
  error: { color: 'red', marginBottom: 10 }
});
