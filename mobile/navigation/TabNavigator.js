import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screens
import SettingsScreen from '../screens/SettingsScreen';
import ArenaLandingScreen from '../screens/ArenaLandingScreen';
import TranslateTowerScreen from '../screens/TranslateTowerScreen';
import VibeTwinScreen from '../screens/VibeTwinScreen';
import DuoVibeScreen from '../screens/DuoVibeScreen';
import VoicePostScreen from '../screens/VoicePostScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="DuoVibe" component={DuoVibeScreen} />
      <Tab.Screen name="TranslateTower" component={TranslateTowerScreen} />
      <Tab.Screen name="Arena" component={ArenaLandingScreen} />
      <Tab.Screen name="VoicePost" component={VoicePostScreen} />
      <Tab.Screen name="VibeTwin" component={VibeTwinScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
