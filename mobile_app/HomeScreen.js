import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Welcome to VibeTZ ??</Text>
      <Button title="Create DuoVibe" onPress={() => navigation.navigate('DuoVibeCreate')} />
    </View>
  );
};

export default HomeScreen;
