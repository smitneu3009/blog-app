import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Headermenu = () => {
  const [state, setState] = useContext(AuthContext);

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            setState({ token: "", user: null });
            await AsyncStorage.removeItem("@auth");
            Alert.alert("Success", "Logged Out Successfully");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <FontAwesome5 name="sign-out-alt" style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
  },
  iconStyle: {
    fontSize: 24,
    color: "black",
    marginBottom: 3,
  },
});

export default Headermenu;
