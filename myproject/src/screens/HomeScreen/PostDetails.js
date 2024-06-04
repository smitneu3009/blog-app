import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PostDetails = ({ route, navigation }) => {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#f77f00" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
            <Text style={styles.postedBy}>{post.postedBy.name}</Text>
            <Text style={styles.createdAt}>{new Date(post.createdDate).toLocaleString()}</Text>
          </View>
          <View style={styles.postContent}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.description}>{post.description}</Text>
          </View>
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="thumbs-up-outline" size={20} color="#f77f00" />
              <Text style={[styles.actionText, { color: '#f77f00' }]}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="chatbubble-outline" size={20} color="#f77f00" />
              <Text style={[styles.actionText, { color: '#f77f00' }]}>Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="share-outline" size={20} color="#f77f00" />
              <Text style={[styles.actionText, { color: '#f77f00' }]}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.commentSection}>
          <Text style={styles.commentHeader}>Comments</Text>
          <View style={styles.comment}>
            <View style={styles.commentHeaderSection}>
              <Text style={styles.commentAuthor}>John Doe</Text>
              <Text style={styles.commentTime}>2 hours ago</Text>
            </View>
            <Text style={styles.commentText}>This is a great post!</Text>
          </View>
          <View style={styles.comment}>
            <View style={styles.commentHeaderSection}>
              <Text style={styles.commentAuthor}>Jane Smith</Text>
              <Text style={styles.commentTime}>3 hours ago</Text>
            </View>
            <Text style={styles.commentText}>Thanks for sharing!</Text>
          </View>
          {/* Add more comments as needed */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 20,
    paddingBottom: 10,
    marginTop: 50,
  },
  backButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#f77f00',
  },
  postContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  postedBy: {
    fontStyle: 'italic',
    fontSize: 12,
  },
  createdAt: {
    fontSize: 14,
    color: '#888',
  },
  postContent: {
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Avenir-Black',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    fontFamily: 'Avenir-Book',
    fontSize: 16,
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    marginLeft: 5,
  },
  commentSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  commentHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#f77f00',
  },
  comment: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
    marginBottom: 10,
  },
  commentHeaderSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentAuthor: {
    fontFamily: 'Avenir-Black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  commentText: {
    fontFamily: 'Avenir-Book',
    fontSize: 16,
    marginTop: 2,
  },
  commentTime: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
});

export default PostDetails;
