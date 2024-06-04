// HomeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen/Home';
import PostDetails from '../../screens/HomeScreen/PostDetails';
import { Text, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
        options={({ navigation }) => ({
          headerTitle: 'Post Details',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: '#f77f00', marginLeft: 10 }}>Back</Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
