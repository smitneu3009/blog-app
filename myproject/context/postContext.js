import { View, Text } from "react-native";
import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

export const postContext = createContext();

export const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/post/get-all-posts");
      setLoading(false);
      setPosts(data?.posts);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <postContext.Provider value={[posts, setPosts]}>
      {children}
    </postContext.Provider>
  );
};
