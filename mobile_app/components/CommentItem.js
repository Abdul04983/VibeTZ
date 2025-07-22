import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { translateText } from "../utils/translateApi";
import { useSelector } from "react-redux";

const CommentItem = ({ comment }) => {
  const token = useSelector((state) => state.auth.token);
  const preferredLanguage = useSelector((state) => state.auth.user.preferredLanguage);
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    if (comment.language !== preferredLanguage) {
      translateText(comment.text, preferredLanguage, token).then(setTranslatedText);
    } else {
      setTranslatedText(comment.text);
    }
  }, [comment.text, comment.language, preferredLanguage, token]);

  return (
    <View>
      <Text>{comment.text}</Text>
      {translatedText !== comment.text && (
        <Text style={{ fontStyle: "italic", color: "gray" }}>{translatedText}</Text>
      )}
    </View>
  );
};

export default CommentItem;
