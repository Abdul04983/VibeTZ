import React, { useState } from 'react';
import { Button } from 'react-native';
import axios from 'axios';

export default function FollowButton({ targetUserId, initialFollowing }) {
  const [following, setFollowing] = useState(initialFollowing);

  const toggleFollow = async () => {
    await axios.put(\http://localhost:5000/api/users/\/follow\);
    setFollowing(!following);
  };

  return <Button title={following ? 'Unfollow' : 'Follow'} onPress={toggleFollow} />;
}
