import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import FooterMenu from "../../components/Menus/FooterMenu";
import { AuthContext } from "../../../context/authContext";

const Account = () => {
  const [state] = useContext(AuthContext);

  return (
    <View style={styles.container}>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 40,
  },
});

export default Account;
