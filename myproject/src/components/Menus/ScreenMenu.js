import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../../screens/SignInScreen";
import SignUpScreen from "../../screens/SignUpScreen";
import HomeScreen from "../../screens/HomeScreen/Home";
import { AuthContext } from "../../../context/authContext";
import Headermenu from "./Headermenu";

const ScreenMenu = () => {
  const [state] = useContext(AuthContext);
  const authenticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
    >
      {authenticatedUser ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{title:"SafeHaven",headerRight:() => <Headermenu/>}}/>
        </>
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
