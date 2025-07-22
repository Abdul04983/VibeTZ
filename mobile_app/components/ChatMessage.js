import React from "react";
import { Text, View } from "react-native";

const ChatMessage = ({ message }) => {
  return (
    <View>
      <Text>{message.text}</Text>
      {message.translated && message.translated !== message.text && (
        <Text style={{ fontStyle: "italic", color: "gray" }}>{message.translated}</Text>
      )}
    </View>
  );
};

export default ChatMessage;
