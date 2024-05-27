import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider } from "../../context/authContext";
import ScreenMenu from "../components/Menus/ScreenMenu";
import { PostProvider } from "../../context/postContext";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <ScreenMenu />
      </PostProvider>
    </AuthProvider>
  );
};

export default Navigation;
