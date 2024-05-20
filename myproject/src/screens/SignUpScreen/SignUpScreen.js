import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const [name, setName]  = useState("");
  const [ username, setUsername]  = useState("");
  const  [password, setPassword]  = useState("");
  

  const navigation = useNavigation();

  const onRegisterPressed = () => {
    navigation.navigate('ConfirmEmail')
  };
  const onSignInPressed = () => {
    navigation.navigate('SignIn')
  };
  const onTermsOfUsePressed = () => {
    console.warn("");
  };
  const onPrivacyPressed = () => {
    console.warn("");
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
        <CustomButton text="Register" onPress={onRegisterPressed} />
        <Text style={styles.text}>
          By registereing, you confirm that you accept our{' '} <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>
        </Text>
        
        <CustomButton
          text="Have an account? Sign in"
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

export default SignUpScreen;
