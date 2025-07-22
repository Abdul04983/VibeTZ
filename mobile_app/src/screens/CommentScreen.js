import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { saveOfflineComment, getOfflineComments } from '../utils/offlineComments';
import { monitorCommentSync } from '../utils/commentSync';
import { apiCreateComment } from '../api/comments';

const CommentScreen = ({ route }) => {
  const [text, setText] = useState('');
  const [isOfflineSyncPending, setIsOfflineSyncPending] = useState(false);
  const postId = route?.params?.postId;

  useEffect(() => {
    monitorCommentSync();
    checkOfflineStatus();
  }, []);

  const checkOfflineStatus = async () => {
    const offlineComments = await getOfflineComments();
    const pending = offlineComments.some(comment => comment.text === text && comment.postId === postId);
    setIsOfflineSyncPending(pending);
  };

  const handleComment = async () => {
    const commentData = {
      postId,
      text,
      createdAt: new Date().toISOString(),
    };

    const state = await NetInfo.fetch();

    if (state.isConnected) {
      try {
        await apiCreateComment(commentData);
        Alert.alert('Success', 'Comment sent!');
        setText('');
        setIsOfflineSyncPending(false);
      } catch (error) {
        await saveOfflineComment(commentData);
        setIsOfflineSyncPending(true);
        Alert.alert('Saved Offline', 'Comment will be sent when online.');
      }
    } else {
      await saveOfflineComment(commentData);
      setIsOfflineSyncPending(true);
      Alert.alert('Offline', 'Comment saved locally. Will sync when online.');
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <TextInput
        placeholder='Write a comment...'
        value={text}
        onChangeText={setText}
        style={{ borderWidth: 1, padding: 8 }}
      />
      <Button title='Send Comment' onPress={handleComment} />
      {isOfflineSyncPending && (
        <Text style={{ color: 'orange', marginTop: 10 }}>Sync Pending</Text>
      )}
    </View>
  );
};

export default CommentScreen;
