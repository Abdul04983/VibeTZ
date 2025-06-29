import { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';

const colors = ['#FF3C38', '#FF8C00', '#FFD300', '#3CB371', '#1E90FF'];

export function useDynamicTheme() {
  const [textColor, setTextColor] = useState(colors[0]);
  const [backgroundUri, setBackgroundUri] = useState(null); // user-set image/video bg

  useEffect(() => {
    const hour = new Date().getHours();
    const interval = setInterval(() => {
      if (hour >= 1 && hour < 6) {
        const index = Math.floor(Math.random() * colors.length);
        setTextColor(colors[index]);
      } else {
        setTextColor('#ffffff');
      }
    }, 3600000); // Change hourly

    return () => clearInterval(interval);
  }, []);

  return { textColor, backgroundUri, setBackgroundUri };
}
