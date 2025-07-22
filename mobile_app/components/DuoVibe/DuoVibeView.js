import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';
import socket from '../../src/utils/socket';

const DuoVibeView = ({ route }) => {
  const { duoVibeId } = route.params;
  const [duoVibe, setDuoVibe] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchDuoVibe = async () => {
      try {
        const res = await axios.get(http://192.168.8.100:5000/api/duovibe/);
        setDuoVibe(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDuoVibe();

    socket.emit('joinDuovibeRoom', duoVibeId);

    socket.on('commentAdded', (newComment) => {
      setDuoVibe((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), newComment],
      }));
    });

    socket.on('likeAdded', (newLike) => {
      setDuoVibe((prev) => ({
        ...prev,
        likes: [...(prev.likes || []), newLike],
      }));
    });

    return () => {
      socket.off('commentAdded');
      socket.off('likeAdded');
    };
  }, [duoVibeId]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await axios.post(http://192.168.8.100:5000/api/duovibe//comment, {
        text: commentText,
        userId: '1234567890',
      });
      socket.emit('newComment', { duoVibeId, comment: res.data });
      setCommentText('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const res = await axios.post(http://192.168.8.100:5000/api/duovibe//like, {
        userId: '1234567890',
      });
      socket.emit('newLike', { duoVibeId, like: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  if (!duoVibe) return <Text>Loading...</Text>;

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{duoVibe.title}</Text>
      <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Collaborators:</Text>
      {duoVibe.users.map((user) => (
        <Text key={user._id}>{user.username}</Text>
      ))}
      <Button title={Like ()} onPress={handleLike} />
      <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Comments:</Text>
      <FlatList
        data={duoVibe.comments || []}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.user.username}:</Text>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <TextInput
        placeholder="Add a comment"
        value={commentText}
        onChangeText={setCommentText}
        style={{ borderWidth: 1, padding: 8, borderRadius: 5, marginVertical: 10 }}
      />
      <Button title="Post Comment" onPress={handleAddComment} />
    </ScrollView>
  );
};

export default DuoVibeView;
