import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { saveOfflinePost, getOfflinePosts } from '../utils/offlineStorage';
import { monitorNetworkAndSync } from '../utils/networkSync';
import { apiCreatePost } from '../api/posts';

const CreatePostScreen = () => {
  const [content, setContent] = useState('');
  const [isOfflineSyncPending, setIsOfflineSyncPending] = useState(false);

  useEffect(() => {
    monitorNetworkAndSync();
    checkOfflineStatus();
  }, []);

  const checkOfflineStatus = async () => {
    const offlinePosts = await getOfflinePosts();
    const pending = offlinePosts.some(post => post.content === content);
    setIsOfflineSyncPending(pending);
  };

  const handlePostCreate = async () => {
    const postData = {
      content,
      timestamp: new Date().toISOString()
    };

    const state = await NetInfo.fetch();

    if (state.isConnected) {
      try {
        await apiCreatePost(postData);
        Alert.alert('Post created successfully!');
        setContent('');
        setIsOfflineSyncPending(false);
      } catch (error) {
        await saveOfflinePost(postData);
        setIsOfflineSyncPending(true);
        Alert.alert('Error sending post. Saved offline.');
      }
    } else {
      await saveOfflinePost(postData);
      setIsOfflineSyncPending(true);
      Alert.alert('No internet. Post saved offline.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Create a new post</Text>
      <TextInput
        placeholder='Write your post content here...'
        value={content}
        onChangeText={setContent}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title='Post' onPress={handlePostCreate} />
      {isOfflineSyncPending && (
        <Text style={{ color: 'orange', marginTop: 10 }}>Sync Pending</Text>
      )}
    </View>
  );
};

export default CreatePostScreen;
