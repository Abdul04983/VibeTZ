import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FollowScreen = () => {
  const [authToken, setAuthToken] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      setAuthToken(token);

      const res = await fetch("http://10.0.2.2:8081/api/users", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleFollowToggle = async (userId, isFollowing) => {
    const action = isFollowing ? "unfollow" : "follow";
    try {
      const res = await fetch("http://10.0.2.2:8081/api/user/" + userId + "/" + action, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authToken,
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      Alert.alert(result.message);
      fetchUsers();
    } catch (error) {
      Alert.alert("Error", "Action failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <Button
        title={item.isFollowing ? "Unfollow" : "Follow"}
        onPress={() => handleFollowToggle(item._id, item.isFollowing)}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  username: {
    fontSize: 16,
  },
  list: {
    paddingBottom: 50,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FollowScreen;
