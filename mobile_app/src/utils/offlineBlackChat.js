import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveOfflineBlackChat = async (message) => {
  try {
    const msgs = JSON.parse(await AsyncStorage.getItem('offlineBlackChat')) || [];
    msgs.push(message);
    await AsyncStorage.setItem('offlineBlackChat', JSON.stringify(msgs));
  } catch (error) {
    console.log('Error saving offline black chat message:', error);
  }
};

export const getOfflineBlackChat = async () => {
  try {
    const msgs = await AsyncStorage.getItem('offlineBlackChat');
    return msgs != null ? JSON.parse(msgs) : [];
  } catch (error) {
    return [];
  }
};

export const clearOfflineBlackChat = async () => {
  try {
    await AsyncStorage.removeItem('offlineBlackChat');
  } catch (error) {
    console.log('Error clearing offline black chat messages:', error);
  }
};
