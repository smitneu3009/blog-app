import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
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
  const [showBanner, setShowBanner] = useState(false); // State to manage banner visibility
  const UserName = state?.user?.name;

  // Fetch posts function
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/post/get-all-posts');
      setPosts(data.posts);
      setLoading(false);
    } catch (error) {
      console.error('API call failed: ', error);
      setLoading(false);
    }
  };

  // Use effect to fetch posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  // Function to handle banner click and refresh page
  const handleBannerClick = () => {
    setShowBanner(false); // Hide banner
    fetchPosts(); // Refresh posts
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, {UserName}</Text>
        <Headermenu style={styles.headerMenu} />
      </View>
      {showBanner && (
        <TouchableOpacity onPress={handleBannerClick} style={styles.banner}>
          <Text style={styles.bannerText}>New post uploaded! Click here to refresh.</Text>
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
    backgroundColor: '#FFD700', // Banner background color (use any trending color)
    paddingVertical: 10,
    alignItems: 'center',
  },
  bannerText: {
    color: '#fff', // Banner text color
    fontWeight: 'bold',
  },
});

export default Home;
