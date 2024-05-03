import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
  const { username, setUsername } = useState("");

  const navigation = useNavigation();

  const onSendPressed = () => {
    navigation.navigate('NewPassword')

  };
  const onSignInPressed = () => {
    navigation.navigate('SignIn')
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your Password</Text>
        <CustomInput
          placeholder="Enter your username"
          value={username}
          setValue={setUsername}
        />
        <CustomButton text="Send" onPress={onSendPressed} />
        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPressed}
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
  text:{
    color:'gray',
    marginVertical:11,
  },
  link:{
    color: '#FDB075'
  }
});

export default ForgotPasswordScreen;
