import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../../../context/authContext';
import Headermenu from '../../components/Menus/Headermenu';
import { postContext } from '../../../context/postContext';
import PostCard from '../../components/Post/PostCard';
import axios from 'axios';

const Home = () => {
  const [state] = useContext(AuthContext);
  const [posts, setPosts] = useContext(postContext);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [latestPostTime, setLatestPostTime] = useState(null); // Track the time of the latest post
  const UserName = state?.user?.name;

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/post/get-all-posts');
      setPosts(data.posts);
      if (data.posts.length > 0) {
        setLatestPostTime(new Date(data.posts[0].createdDate).getTime());
      }
      setLoading(false);
    } catch (error) {
      console.error('API call failed: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    const intervalId = setInterval(checkForNewPosts, 60000); // Poll every 60 seconds
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [latestPostTime]);

  const checkForNewPosts = async () => {
    try {
      const { data } = await axios.get('/post/get-latest-post-time');
      const newPostTime = new Date(data.latestPostTime).getTime();
      console.log('Latest post time from server:', newPostTime);
      console.log('Current latest post time:', latestPostTime);
      if (latestPostTime && newPostTime > latestPostTime) {
        setShowBanner(true);
      }
    } catch (error) {
      console.error('Error checking for new posts: ', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const handleBannerClick = () => {
    setShowBanner(false);
    fetchPosts();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          <Text style={styles.welcomeText}>Welcome,</Text> {UserName}
        </Text>
        <Headermenu style={styles.headerMenu} />
      </View>
      {showBanner && (
        <TouchableOpacity onPress={handleBannerClick} style={styles.banner}>
          <Text style={styles.bannerText}>New posts!</Text>
        </TouchableOpacity>
      )}
      {loading && !refreshing ? (
        <ActivityIndicator size="large" color="#76ABAE" />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={styles.posts}>
            {posts.length > 0 ? (
              posts.map((post, index) => <PostCard key={index} posts={[post]} />)
            ) : (
              <Text style={styles.noPosts}>No posts available</Text>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 40,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    marginTop: 30,
    marginHorizontal: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcomeText: {
    color: '#f77f00',
  },
  headerMenu: {
    alignSelf: 'flex-end',
  },
  posts: {
    padding: 14,
  },
  noPosts: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  banner: {
    backgroundColor: '#f77f00',
    paddingVertical: 10,
    alignItems: 'center',
  },
  bannerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
