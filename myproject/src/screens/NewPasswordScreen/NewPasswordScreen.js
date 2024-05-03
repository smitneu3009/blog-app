import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";

const NewPasswordScreen = () => {
  const [ code, setCode ] = useState("");
  const [ newPassword, setNewPassword ] = useState("");

  const navigation = useNavigation()

  const onSubmitPressed = () => {
    navigation.navigate('Home')

  };
  const onSignInPressed = () => {
    navigation.navigate('SignIn')
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your Password</Text>
        <CustomInput
          placeholder="Code"
          value={code}
          setValue={setCode}
        />
        <CustomInput
          placeholder="Enter your new password"
          value={newPassword}
          setValue={setNewPassword}
        />
        <CustomButton text="Submit" onPress={onSubmitPressed} />
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

export default NewPasswordScreen;
