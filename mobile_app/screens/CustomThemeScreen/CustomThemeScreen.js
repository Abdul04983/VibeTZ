import React, { useState, useEffect } from "react";
import { View, Text, Button, ImageBackground, StyleSheet, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";

const vibrantColors = ["#FF4B2B", "#FF416C", "#6A82FB", "#00C9FF", "#FBD786"];

export default function CustomThemeScreen() {
  const [bgImage, setBgImage] = useState(null);
  const [currentColor, setCurrentColor] = useState(vibrantColors[0]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setBgImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 1 && hour <= 5) {
      const index = hour % vibrantColors.length;
      setCurrentColor(vibrantColors[index]);
    } else {
      const dynamicColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      setCurrentColor(dynamicColor);
    }
  }, []);

  return (
    <ImageBackground source={bgImage ? { uri: bgImage } : null} style={styles.container}>
      <View style={styles.inner}>
        <Text style={[styles.title, { color: currentColor }]}>?? Customize Your Theme</Text>
        <Button title="Choose Background" onPress={pickImage} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "rgba(0,0,0,0.3)" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
