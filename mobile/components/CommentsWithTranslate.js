import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import axios from 'axios';

export default function CommentsWithTranslate({ postId }) {
  const [comments, setComments] = useState([]);
  const [translatedIds, setTranslatedIds] = useState({});

  useEffect(() => {
    axios.get(\http://localhost:5000/api/comments/\\)
      .then(res => setComments(res.data));
  }, [postId]);

  const translateComment = async (id, text) => {
    try {
      const res = await axios.post('http://localhost:5000/api/translate', { text, targetLang: 'en' });
      setTranslatedIds(prev => ({ ...prev, [id]: res.data.translatedText }));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <FlatList
      data={comments}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 10 }}>
          <Text>{item.user.username}: {item.text}</Text>
          {translatedIds[item._id] ? (
            <Text style={{ fontStyle: 'italic', color: 'gray' }}>Translated: {translatedIds[item._id]}</Text>
          ) : (
            <Button title='Translate' onPress={() => translateComment(item._id, item.text)} />
          )}
        </View>
      )}
    />
  );
}
