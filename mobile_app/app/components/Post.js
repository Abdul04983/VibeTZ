import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { tipUser } from '../api/tipUser';

import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

const Post = ({ post }) => {
  const { user, token } = useContext(AuthContext);
  const [tipping, setTipping] = useState(false);

  const handleTip = async () => {
    setTipping(true);
    try {
      await tipUser(user._id, post.creatorId, 10, token);
      Alert.alert('Success', 'You tipped 10 VibeCoins!');
    } catch {
      Alert.alert('Error', 'Failed to send tip');
    }
    setTipping(false);
  };

  return (
    <View>
      <Text>{post.content}</Text>
      <Button title={tipping ? 'Tipping...' : 'Tip 10 Coins'} onPress={handleTip} disabled={tipping} />
    </View>
  );
};

export default Post;
