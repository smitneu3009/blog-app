// AuthenticatedTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Post from '../../screens/HomeScreen/Post';
import Account from '../../screens/HomeScreen/Account';
import FooterMenu from '../../components/Menus/FooterMenu';
import MyPosts from '../HomeScreen/MyPosts';
import HomeStack from '../HomeScreen/HomeStack';

const Tab = createBottomTabNavigator();

const AuthenticatedTabs = () => {
  return (
    <Tab.Navigator tabBar={(props) => <FooterMenu {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen name="MyPosts" component={MyPosts} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default AuthenticatedTabs;
