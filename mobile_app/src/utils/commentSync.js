import NetInfo from '@react-native-community/netinfo';
import { getOfflineComments, clearOfflineComments } from './offlineComments';
import { apiCreateComment } from '../api/comments'; // hakikisha path ni sahihi

export const monitorCommentSync = () => {
  NetInfo.addEventListener(async (state) => {
    if (state.isConnected) {
      const offlineComments = await getOfflineComments();
      for (const comment of offlineComments) {
        try {
          await apiCreateComment(comment);
        } catch (error) {
          console.log('Error syncing comment:', error);
          return;
        }
      }
      await clearOfflineComments();
    }
  });
};
