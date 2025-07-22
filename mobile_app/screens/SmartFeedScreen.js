import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from "react-native";

const SmartFeedScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/smartfeed", {
        headers: {
          Authorization: "Bearer YOUR_JWT_TOKEN"
        }
      });
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch feed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.username}>@{item.user?.username || "anonymous"}</Text>
      <Text style={styles.caption}>{item.caption}</Text>
      {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      <Text style={styles.time}>{new Date(item.createdAt).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#444" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  postContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  },
  username: { fontWeight: "bold", fontSize: 16 },
  caption: { marginTop: 5, fontSize: 14 },
  time: { marginTop: 5, fontSize: 12, color: "#777" },
  image: { width: "100%", height: 200, marginTop: 10, borderRadius: 8 }
});

export default SmartFeedScreen;
