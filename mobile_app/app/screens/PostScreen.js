import React, { useState } from "react";
import { speak TouchableOpacity, Text } from '../utils/textToSpeech';
import { View, TextInput, Button, Image, StyleSheet, Alert, Scroll TouchableOpacity, View } from "react-native";
import { speak TouchableOpacity, Text } from '../utils/textToSpeech';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { speak TouchableOpacity, Text } from '../utils/textToSpeech';
import * as ImagePicker from "expo-image-picker";

const PostScreen = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!content) {
      Alert.alert("Error", "Andika kitu kwanza!");
      return;
    }

    const token = await AsyncStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("content", content);
    if (image) {
      const filename = image.split("/").pop();
      const type = "image/" + filename.split(".").pop();

      formData.append("image", {
        uri: image,
        name: filename,
        type: type,
      });
    }

    try {
      const res = await fetch("http://10.0.2.2:8081/api/posts", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert("Umefanikiwa!", "Post imetumwa!");
        setContent("");
        setImage(null);
      } else {
        Alert.alert("Error", data.message || "Imeshindikana");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Tatizo limetokea");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Andika post yako hapa..."
        multiline
        value={content}
        onChangeText={setContent}
      />
      <Button title="Chagua Picha" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={{ marginTop: 20 }}>
        <Button title="Tuma Post" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    padding: 12,
    minHeight: 100,
    marginBottom: 16,
    textAlignVertical: "top",
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
});

export default PostScreen;

// ?? Listen Button
<TouchableOpacity onPress={() => speakText(post.text)}><Text style={{color:'blue'}}>?? Listen</Text></TouchableOpacity>
