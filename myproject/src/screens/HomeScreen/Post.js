import { View, Text, StyleSheet, TextInput, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
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
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.heading}>Create a post</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Enter a title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.descriptionInput}
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
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <CustomButton
            style={styles.customButtonStyle}
            text={loading ? "Please Wait" : "Create Post"}
            loading={loading}
            onPress={handlePost}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 80,
    bottom: 0,
  },
  heading: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
  },
  titleInput: {
    width: 360,
    height: 40, // Default height for title
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 20,
    paddingLeft: 10,
  },
  descriptionInput: {
    width: 360,
    height: 150, // Height to fit approximately six lines
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 20,
    paddingLeft: 10,
    textAlignVertical: "top",
    paddingTop: 10,
  },
  pickerContainer: {
    width: 360,
    marginTop: 20,
    alignItems: "center", // Center horizontally
  },
  customButtonStyle: {
    width: 110,
    marginTop: 30,
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
