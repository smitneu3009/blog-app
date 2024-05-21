import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider } from "../../context/authContext";
import ScreenMenu from "../components/Menus/ScreenMenu";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    
      <AuthProvider>
        <ScreenMenu/>
      </AuthProvider>
    
  );
};

export default Navigation;
