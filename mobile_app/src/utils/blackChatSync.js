import NetInfo from '@react-native-community/netinfo';
import { getOfflineBlackChat, clearOfflineBlackChat } from './offlineBlackChat';
import { apiSendBlackChatMessage } from '../api/blackChat'; // adjust path if needed

export const monitorBlackChatSync = () => {
  NetInfo.addEventListener(async (state) => {
    if (state.isConnected) {
      const offlineMsgs = await getOfflineBlackChat();
      for (const msg of offlineMsgs) {
        try {
          await apiSendBlackChatMessage(msg);
        } catch (error) {
          console.log('Error syncing black chat message:', error);
          return;
        }
      }
      await clearOfflineBlackChat();
    }
  });
};
