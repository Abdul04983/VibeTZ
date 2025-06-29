import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const colors = ['#FF3C38', '#FF8C00', '#FFD300', '#3CB371', '#1E90FF'];

export const ThemeProvider = ({ children }) => {
  const [textColor, setTextColor] = useState(colors[0]);

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 1 && hour < 6) {
      // Between 1 AM and 6 AM, rotate among colors every minute
      let index = 0;
      const interval = setInterval(() => {
        setTextColor(colors[index]);
        index = (index + 1) % colors.length;
      }, 60000);
      return () => clearInterval(interval);
    } else {
      setTextColor('#000'); // default black text for daytime
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ textColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
