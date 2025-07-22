import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity } from 'react-native';

const API_URL = 'http://localhost:5000/api/posts';

export default function PostScreen() {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  const handleLike = async (postId) => {
    await fetch(`${API_URL}/${postId}/like`, { method: 'POST' });
    fetchPosts();
  };

  const handleComment = async () => {
    if (!selectedPostId || !comment) return;
    await fetch(`${API_URL}/${selectedPostId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment }),
    });
    setComment('');
    fetchPosts();
  };

  const renderPost = ({ item }) => (
    <View style={{ marginBottom: 20, padding: 10, borderWidth: 1 }}>
      <Text>{item.username}</Text>
      <Image source={{ uri: item.image }} style={{ width: '100%', height: 200 }} />
      <Text>{item.caption}</Text>
      <TouchableOpacity onPress={() => handleLike(item._id)}>
        <Text>?? {item.likes.length} Likes</Text>
      </TouchableOpacity>
      <Text>?? {item.comments.length} Comments</Text>
      <Button title="Comment" onPress={() => setSelectedPostId(item._id)} />
    </View>
  );

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={renderPost}
      />
      {selectedPostId && (
        <View style={{ marginTop: 10 }}>
          <TextInput
            placeholder="Write a comment..."
            value={comment}
            onChangeText={setComment}
            style={{ borderWidth: 1, padding: 5 }}
          />
          <Button title="Send" onPress={handleComment} />
        </View>
      )}
    </View>
  );
}
