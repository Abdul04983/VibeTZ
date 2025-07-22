import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveOfflineComment = async (comment) => {
  try {
    const comments = JSON.parse(await AsyncStorage.getItem('offlineComments')) || [];
    comments.push(comment);
    await AsyncStorage.setItem('offlineComments', JSON.stringify(comments));
  } catch (error) {
    console.log('Error saving offline comment:', error);
  }
};

export const getOfflineComments = async () => {
  try {
    const comments = await AsyncStorage.getItem('offlineComments');
    return comments != null ? JSON.parse(comments) : [];
  } catch (error) {
    return [];
  }
};

export const clearOfflineComments = async () => {
  try {
    await AsyncStorage.removeItem('offlineComments');
  } catch (error) {
    console.log('Error clearing offline comments:', error);
  }
};
