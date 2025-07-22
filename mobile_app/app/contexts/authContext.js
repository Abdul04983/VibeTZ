import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storagedUser = await AsyncStorage.getItem('@user');
        const storagedToken = await AsyncStorage.getItem('@token');

        if (storagedUser && storagedToken) {
          setUser(JSON.parse(storagedUser));
          setToken(storagedToken);
        }
      } catch (error) {
        console.log('Failed to load user data', error);
      } finally {
        setLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setUser(response.data.user);
      setToken(response.data.token);
      await AsyncStorage.setItem('@user', JSON.stringify(response.data.user));
      await AsyncStorage.setItem('@token', response.data.token);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('@user');
    await AsyncStorage.removeItem('@token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
