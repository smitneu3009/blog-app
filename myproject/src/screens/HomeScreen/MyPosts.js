import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, RefreshControl } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PostCard from "../../components/Post/PostCard";
import { AuthContext } from '../../../context/authContext';

const MyPosts = () => {
    const [state] = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const UserName = state?.user?.name;

    const getUserPosts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/post/get-user-posts");
            setPosts(data?.userPosts);
            setLoading(false);
        } catch (error) {
            console.log("API call failed: ", error);
            setLoading(false);
            if (error.response) {
                Alert.alert("Error", error.response.data.message || "Something went wrong!");
            } else {
                Alert.alert("Error", "Network error or server is not reachable");
            }
        }
    }

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const { data } = await axios.get("/post/get-user-posts");
            setPosts(data?.userPosts);
        } catch (error) {
            console.log("API call failed: ", error);
            if (error.response) {
                Alert.alert("Error", error.response.data.message || "Something went wrong!");
            } else {
                Alert.alert("Error", "Network error or server is not reachable");
            }
        } finally {
            setRefreshing(false);
        }
    }

    useEffect(() => {
        getUserPosts();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>My Posts</Text>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#76ABAE" />
            ) : (
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#76ABAE']}
                        />
                    }
                >
                    <Text style={styles.totalPosts}>Total Posts: {posts.length}</Text>
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
        backgroundColor: "#f5f5f5",
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
    scrollContainer: {
        paddingVertical: 20,
    },
    totalPosts: {
        fontSize: 16,
        color: "#666",
        marginBottom: 5,
        textAlign: "center",
    },
    posts: {
        padding: 14,
    },
    noPosts: {
        fontSize: 18,
        color: "#999",
        textAlign: "center",
        marginTop: 10,
    },
});

export default MyPosts;
