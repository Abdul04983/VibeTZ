import NetInfo from '@react-native-community/netinfo';
import { getOfflineLikes, clearOfflineLikes } from './offlineLikes';
import { apiLikePost } from '../api/likes'; // adjust if needed

export const monitorLikeSync = () => {
  NetInfo.addEventListener(async (state) => {
    if (state.isConnected) {
      const offlineLikes = await getOfflineLikes();
      for (const like of offlineLikes) {
        try {
          await apiLikePost(like.postId);
        } catch (error) {
          console.log('Error syncing like:', error);
          return;
        }
      }
      await clearOfflineLikes();
    }
  });
};
