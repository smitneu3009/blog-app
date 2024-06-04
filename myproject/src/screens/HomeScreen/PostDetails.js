import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostDetails = ({ route }) => {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.description}>{post.description}</Text>
      <Text style={styles.postedBy}>Posted By: {post.postedBy.name}</Text>
      <Text style={styles.createdAt}>Created At: {new Date(post.createdDate).toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  postedBy: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  createdAt: {
    fontSize: 16,
    color: '#888',
  },
});

export default PostDetails;
