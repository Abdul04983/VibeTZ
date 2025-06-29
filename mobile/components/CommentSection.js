import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import axios from 'axios';

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  const loadComments = async () => {
    const res = await axios.get(\http://localhost:5000/api/comments/\\);
    setComments(res.data);
  };

  const submitComment = async () => {
    await axios.post('http://localhost:5000/api/comments', { postId, text });
    setText('');
    loadComments();
  };

  useEffect(() => { loadComments(); }, []);

  return (
    <View>
      <FlatList data={comments} keyExtractor={item => item._id}
        renderItem={({ item }) => <Text>{item.user.username}: {item.text}</Text>} />
      <TextInput placeholder="Add a comment..." value={text} onChangeText={setText} />
      <Button title="Send" onPress={submitComment} />
    </View>
  );
}
