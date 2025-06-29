import { useEffect } from 'react';
import axios from 'axios';

const CreatorEarningsTracker = ({ creatorId, views, subscribers, watchTime }) => {
  useEffect(() => {
    if (!creatorId) return;
    const sendCreatorEarnings = async () => {
      try {
        await axios.post('http://YOUR_BACKEND_URL/api/earning/creator/update', {
          creatorId,
          views,
          subscribers,
          watchTime
        });
      } catch (error) {
        console.log('Error updating creator earnings:', error.message);
      }
    };
    sendCreatorEarnings();
  }, [views, subscribers, watchTime]);

  return null;
};

export default CreatorEarningsTracker;
