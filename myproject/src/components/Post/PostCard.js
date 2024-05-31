import { View, Text, StyleSheet, Alert, Animated, LayoutAnimation, UIManager, Platform } from "react-native";
import React, { useRef } from "react";
import moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const formatTimeAgo = (date) => {
  const now = moment();
  const duration = moment.duration(now.diff(date));
  const seconds = duration.asSeconds();
  const minutes = duration.asMinutes();
  const hours = duration.asHours();
  const days = duration.asDays();
  const weeks = duration.asWeeks();

  if (minutes < 1) {
    return `${Math.floor(seconds)}s ago`;
  } else if (hours < 1) {
    return `${Math.floor(minutes)}m ago`;
  } else if (days < 1) {
    return `${Math.floor(hours)}h ago`;
  } else if (weeks < 1) {
    return `${Math.floor(days)}d ago`;
  } else {
    return `${Math.floor(weeks)} weeks ago`;
  }
};

const PostCard = ({ posts, setPosts, myPostScreen }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleDeletePrompt = (id) => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Delete",
        onPress: () => handleDeletePost(id),
      }
    ]);
  };

  const handleDeletePost = async (id) => {
    try {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(async () => {
        const { data } = await axios.delete(`/post/delete-post/${id}`);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
        slideAnim.setValue(0);  // Reset the animation value for future deletions
      });
    } catch (error) {
      console.log("API call failed: ", error);
    }
  };

  const slideLeft = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -500], // Slide out far enough to be out of view
  });

  return (
    <View style={styles.container}>
      {posts?.map((post, i) => (
        <Animated.View key={i} style={[styles.card, { transform: [{ translateX: slideLeft }] }]}>
          <Text style={styles.title}>{post?.title}</Text>
          <Text style={styles.description}>{post?.description}</Text>
          <View style={styles.footer}>
            {post?.postedBy?.name && (
              <Text style={styles.postedBy}>Posted By: {post?.postedBy?.name}</Text>
            )}
            <Text style={styles.createdAt}>{formatTimeAgo(post?.createdDate)}</Text>
            {myPostScreen && (
              <Text>
                <FontAwesome name="trash" size={20} color="#f77f00" onPress={() => handleDeletePrompt(post?._id)} />
              </Text>
            )}
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  card: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#f77f00',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontFamily: 'Avenir-Black',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontFamily: 'Avenir-Book',
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  footer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  postedBy: {
    fontStyle: 'italic',
    fontSize: 12,
    color: '#888',
  },
  createdAt: {
    fontSize: 12,
    color: '#888',
  },
});

export default PostCard;
