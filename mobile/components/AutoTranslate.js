import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator } from 'react-native';

export default function AutoTranslate({ text, targetLang }) {
  const [translated, setTranslated] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!text) return;
    setLoading(true);

    // Simulate translation API call - replace with real API later
    setTimeout(() => {
      setTranslated(text + ' (translated to ' + targetLang + ')');
      setLoading(false);
    }, 1000);
  }, [text, targetLang]);

  if (loading) return <ActivityIndicator size="small" color="#6200ee" />;

  return <Text style={{ fontStyle: 'italic', color: '#555' }}>{translated}</Text>;
}
