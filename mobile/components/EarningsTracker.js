import { useEffect } from 'react';
import { View } from 'react-native';
import axios from 'axios';

const EarningsTracker = ({ userId, watchTime }) => {
  useEffect(() => {
    if (!userId || !watchTime) return;
    const sendEarnings = async () => {
      try {
        await axios.post('http://YOUR_BACKEND_URL/api/earning/viewer/update', {
          userId,
          watchTimeInSeconds: watchTime
        });
      } catch (error) {
        console.log('Error sending earnings:', error.message);
      }
    };
    sendEarnings();
  }, [watchTime]);

  return <View />;
};

export default EarningsTracker;
