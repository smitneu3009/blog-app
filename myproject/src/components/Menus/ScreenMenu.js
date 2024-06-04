// ScreenMenu.js
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from '../../screens/SignInScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import { AuthContext } from '../../../context/authContext';
import AuthenticatedTabs from '../../screens/Layouts/AuthenticatedTabs';

const Stack = createNativeStackNavigator();

const ScreenMenu = () => {
  const [state] = useContext(AuthContext);
  const authenticatedUser = state?.user && state?.token;

  return (
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
        {authenticatedUser ? (
          <Stack.Screen name="Authenticated" component={AuthenticatedTabs} />
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
  );
};

export default ScreenMenu;
