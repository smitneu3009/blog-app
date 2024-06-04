// HomeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen/Home';
import PostDetails from '../../screens/HomeScreen/PostDetails';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{
          headerShown: false,  // Hides the default header
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
