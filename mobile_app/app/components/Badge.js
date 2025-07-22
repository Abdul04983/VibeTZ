import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge = ({ level }) => {
  const getBadgeStyle = () => {
    switch (level) {
      case 'bronze':
        return { emoji: '??', color: '#cd7f32', label: 'Bronze Creator' };
      case 'silver':
        return { emoji: '??', color: '#c0c0c0', label: 'Silver Creator' };
      case 'gold':
        return { emoji: '??', color: '#ffd700', label: 'Gold Creator' };
      case 'diamond':
        return { emoji: '??', color: '#00f0ff', label: 'Diamond Creator' };
      default:
        return { emoji: '?', color: '#aaa', label: 'Newbie' };
    }
  };

  const badge = getBadgeStyle();

  return (
    <View style={[styles.badge, { borderColor: badge.color }]}>
      <Text style={[styles.emoji]}>{badge.emoji}</Text>
      <Text style={[styles.label, { color: badge.color }]}>{badge.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  emoji: {
    fontSize: 32,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default Badge;
