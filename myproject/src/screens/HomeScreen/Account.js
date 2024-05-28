import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, ScrollView, Alert } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import axios from "axios";
import { AuthContext } from "../../../context/authContext";

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
      setState({ ...state, user: data?.updatedUser });
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={[styles.input, styles.disabled]}
          value={username}
          editable={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Role</Text>
        <TextInput
          style={[styles.input, styles.disabled]}
          value={state?.user.role}
          editable={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          onPress={handleUpdate}
          text={loading ? "Please Wait" : "Update Profile"}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    width: 90,
    fontWeight: "bold",
    color: "#444",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  disabled: {
    backgroundColor: "#f2f2f2",
  },
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    width: 180,
  },
});

export default Account;
