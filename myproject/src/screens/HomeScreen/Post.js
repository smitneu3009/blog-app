import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import CustomButton from "../../components/CustomButton/CustomButton";
import axios from "axios";

const Post = ({ navigation }) => {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handlePost = async () => {
    try {
      setLoading(true);
      if (!title) {
        setLoading(false);
        return Alert.alert("Error", "Title is Required");
      }
      if (!description) {
        setLoading(false);
        return Alert.alert("Error", "Description is Required");
      }
      if (!category) {
        setLoading(false);
        return Alert.alert("Error", "Category is Required");
      }
      const { data } = await axios.post("/post/create-post", {
        title,
        description,
        categories: category,
      });
      setLoading(false);
      Alert.alert("Success", data?.message);
      setTitle("");
      setDescription("");
      setCategory("");
      navigation.navigate("Home");
    } catch (error) {
      console.log("API call failed: ", error);
      setLoading(false);
      if (error.response) {
        if (error.response.data.message === "Title is already used") {
          Alert.alert("Error", "Title is already used. Please choose another title.");
        } else {
          Alert.alert("Error", error.response.data.message || "Something went wrong!");
        }
      } else {
        Alert.alert("Error", "Network error or server is not reachable");
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Create a post</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter a description"
          multiline={true}
          numberOfLines={6}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={[
              { label: "Medical", value: "Medical" },
              { label: "Shelter", value: "Shelter" },
              { label: "Community Center", value: "Community center" },
              { label: "Education", value: "Education" },
            ]}
            placeholder={{ label: "Select a Category", value: null }}
            style={pickerSelectStyles}
            value={category} // Bind picker to category state
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            style={styles.customButtonStyle}
            text={loading ? "Please Wait" : "Create Post"}
            loading={loading}
            onPress={handlePost}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 25,
  },
  input: {
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
  },
  textArea: {
    height: 150,
    paddingTop: 10,
    textAlignVertical: "top",
  },
  pickerContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "center",
  },
  customButtonStyle: {
    width: 110,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: "100%",
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingLeft: 10,
    alignSelf: "center",
  },
  inputAndroid: {
    width: "100%",
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingLeft: 10,
    alignSelf: "center",
  },
});

export default Post;
