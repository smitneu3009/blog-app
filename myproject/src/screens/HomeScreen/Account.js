import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import CustomButton from "../../components/CustomButton/CustomButton";
import axios from "axios";

const Account = () => {
  const [state, setState] = useContext(AuthContext);
  const { user } = state;
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [username] = useState(user?.username);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put("/auth/update-user", {
        name,
        password,
        username,
      });
      setLoading(false);
      let UD = JSON.stringify(data);
      setState({ ...state, user: UD?.updatedUser });
      Alert.alert(data.message);
    } catch (error) {
      console.log("API call failed: ", error);
      setLoading(false);
      if (error.response) {
        Alert.alert(
          "Error",
          error.response.data.message || "Something went wrong!"
        );
      } else {
        Alert.alert("Error", "Network error or server is not reachable");
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
            }}
            style={{ width: 150, height: 150, borderRadius: 100 }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Name</Text>
          <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Username</Text>
          <TextInput
            style={styles.inputBox}
            value={username}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            style={styles.inputBox}
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Role</Text>
          <TextInput
            style={styles.inputBox}
            value={state?.user.role}
            editable={false}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <CustomButton
            style={styles.customButtonStyle}
            onPress={handleUpdate}
            text={loading ? "Please Wait" : "Updated Profile"}
            loading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    margin: 10,
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontWeight: "bold",
    width: 70,
    color: "gray",
  },
  inputBox: {
    width: 250,
    backgroundColor: "#ffffff",
    marginLeft: 8,
    fontSize: 16,
    padding: 10,
    borderRadius: 6,
  },
  customButtonStyle: {
    width: 180,
    marginTop: 30,
  },
});

export default Account;
