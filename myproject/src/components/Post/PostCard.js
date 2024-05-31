import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";

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

const PostCard = ({ posts,myPostScreen }) => {

  const [loading, setLoading] = useState(false);

  const handleDeletePropmt = (id) =>{
    Alert.alert("Delete Post","Are you sure you want to delete this post?",[{
      text:"Cancel",
      onPress:()=>{},
    }
    ,{
      text:"Delete",
      onPress:()=>handleDeletePost(id),
    }
  ])
  }

  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/post/delete-post/${id}`);
      setLoading(false);
      Alert.alert("Post deleted", data.message);
    } catch (error) {
      setLoading(false);
      console.log("API call failed: ", error);
    }
  }
  return (
    <View style={styles.container}>
      {posts?.map((post, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.title}>{post?.title}</Text>
          <Text style={styles.description}>{post?.description}</Text>
          <View style={styles.footer}>
            {post?.postedBy?.name && (<Text style={styles.postedBy}>Posted By: {post?.postedBy?.name}</Text>)}
            {/* <Text style={styles.postedBy}>Posted By: {post?.postedBy?.name}</Text> */}
            <Text style={styles.createdAt}>{formatTimeAgo(post?.createdDate)}</Text>
            {myPostScreen && (
              <Text>
                <FontAwesome name="trash" size={20} color="#f77f00" onPress={() => handleDeletePropmt(post?._id) }/>
              </Text>
            )}
          </View>
        </View>
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
