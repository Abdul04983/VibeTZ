import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AutoTranslate from './AutoTranslate';

export default function CommentItem({ comment }) {
  return (
    <View style={styles.container}>
      <Text>{comment.originalText}</Text>
      <AutoTranslate text={comment.originalText} targetLang='en' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, borderBottomWidth: 1, borderColor: '#eee' }
});
