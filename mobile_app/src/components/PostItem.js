import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { apiLikePost } from '../api/likes';
import { saveOfflineLike, getOfflineLikes } from '../utils/offlineLikes';
import { monitorLikeSync } from '../utils/likeSync';

const PostItem = ({ post }) => {
  const [isOfflineSyncPending, setIsOfflineSyncPending] = useState(false);

  useEffect(() => {
    monitorLikeSync();
    checkOfflineStatus();
  }, []);

  const checkOfflineStatus = async () => {
    const offlineLikes = await getOfflineLikes();
    const pending = offlineLikes.some(like => like.postId === post._id);
    setIsOfflineSyncPending(pending);
  };

  const handleLike = async () => {
    const state = await NetInfo.fetch();

    if (state.isConnected) {
      try {
        await apiLikePost(post._id);
        alert('Post liked!');
        setIsOfflineSyncPending(false);
      } catch (error) {
        await saveOfflineLike({ postId: post._id });
        setIsOfflineSyncPending(true);
        alert('Like saved offline and will sync later.');
      }
    } else {
      await saveOfflineLike({ postId: post._id });
      setIsOfflineSyncPending(true);
      alert('No internet. Like saved offline.');
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Text>{post.content}</Text>
      <TouchableOpacity onPress={handleLike} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: 'blue' }}>Like</Text>
        {isOfflineSyncPending && (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: 'orange',
              marginLeft: 6,
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default PostItem;
