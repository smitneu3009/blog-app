import React, { useState,useContext } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert } from "react-native";
import { AuthContext } from "../../../context/authContext";
import Logo from "../../../assets/images/SafeHaven (2).png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const SignInScreen = () => {

  const [state,setState] = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  const handleSubmit = async () => {
    console.log("handleSubmit called");
    try {
      setLoading(true);
      if (!username || !password) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }

      console.log("Making API call with: ", { username, password });

      const response = await axios.post("/auth/login", {
        username,
        password,
      });
      setState(response.data);
      await AsyncStorage.setItem("@auth", JSON.stringify(response.data));
      Alert.alert("Success", response.data.message);
      navigation.navigate("Home");
      // Uncomment the line below if you want to navigate to the home screen after successful login
      // navigation.navigate("Home");
    } catch (error) {
      console.log("API call failed: ", error);
      if (error.response) {
        Alert.alert("Error", error.response.data.message || "Something went wrong!");
      } else {
        Alert.alert("Error", "Network error or server is not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  //
  const getLocalStorageData = async() => {
    let data =await AsyncStorage.getItem("@auth");
    console.log("Data from Local Storage: ", data);

  }
  getLocalStorageData();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomButton text="Sign In" loading={loading} onPress={handleSubmit} />
        {/* <CustomButton
          text="Forgot Password"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        /> */}
        <CustomButton
          text="Don't have an account? Create One"
          onPress={() => navigation.navigate("SignUp")}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 170,
    marginBottom: 30,
  },
});

export default SignInScreen;
