import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import axios from 'axios';

export default function LikeButton({ postId, initialLiked, initialCount }) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const toggleLike = async () => {
    setLiked(!liked);
    setCount(prev => liked ? prev - 1 : prev + 1);
    await axios.put(\http://localhost:5000/api/likes/\\);
  };

  return (
    <TouchableOpacity onPress={toggleLike}>
      <Text>{liked ? '??' : '??'} {count}</Text>
    </TouchableOpacity>
  );
}
