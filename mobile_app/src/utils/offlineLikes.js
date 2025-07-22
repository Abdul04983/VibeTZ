import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveOfflineLike = async (like) => {
  try {
    const likes = JSON.parse(await AsyncStorage.getItem('offlineLikes')) || [];
    likes.push(like);
    await AsyncStorage.setItem('offlineLikes', JSON.stringify(likes));
  } catch (error) {
    console.log('Error saving offline like:', error);
  }
};

export const getOfflineLikes = async () => {
  try {
    const likes = await AsyncStorage.getItem('offlineLikes');
    return likes != null ? JSON.parse(likes) : [];
  } catch (error) {
    return [];
  }
};

export const clearOfflineLikes = async () => {
  try {
    await AsyncStorage.removeItem('offlineLikes');
  } catch (error) {
    console.log('Error clearing offline likes:', error);
  }
};
