import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    console.log("handleSubmit called");
    try {
      setLoading(true);
      if (!name || !username || !password) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      const response = await axios.post("/auth/register", {
        name,
        username,
        password,
      });
      Alert.alert("Success", response.data.message);
      navigation.navigate("SignIn");
    } catch (error) {
      if (error.response) {
        Alert.alert("Error", error.response.data.message || "Something went wrong!");
      } else {
        Alert.alert("Error", "Network error or server is not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>
        <CustomInput
          placeholder="Name"
          value={name}
          setValue={setName}
        />
        <CustomInput placeholder="Username" value={username} setValue={setUsername} />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomButton text="Register" loading={loading} onPress={handleSubmit} />
        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link}>Terms of Use</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
        <CustomButton
          text="Have an account? Sign in"
          onPress={() => navigation.navigate("SignIn")}
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
    marginTop: 35,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 11,
  },
  link: {
    color: '#FDB075'
  }
});

export default SignUpScreen;
