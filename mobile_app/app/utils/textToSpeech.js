import * as Speech from 'expo-speech';

export const speakText = (text) => {
  Speech.speak(text, {
    language: 'en',
    pitch: 1.0,
    rate: 1.0,
  });
};
