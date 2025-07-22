import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import SearchScreen from '../screens/SearchScreen';
import ChatScreen from '../screens/ChatScreen';
import VoicePostScreen from '../screens/VoicePostScreen';
import MPesaScreen from '../screens/MPesaScreen';
import AutoTranslateScreen from '../screens/AutoTranslateScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="CreatePost" component={CreatePostScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="VoicePost" component={VoicePostScreen} />
      <Tab.Screen name="MPesa" component={MPesaScreen} />
      <Tab.Screen name="Translate" component={AutoTranslateScreen} />
    </Tab.Navigator>
  );
}
