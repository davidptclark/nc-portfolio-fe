import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import * as ImagePicker from "expo-image-picker";

import { postCloudinary, postVideoToDatabase } from "../utils/api";

import AddTags from "./AddTags";

//Add user context

export default Upload = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [tags, setTags] = useState([]);
  const { user } = useContext(UserContext);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  function handleUpload(file) {
    if (file !== null) {
      setIsLoading(true);

      const url = `https://api.cloudinary.com/v1_1/ncapp/auto/upload`;

      let newfile = {
        uri: file,
        type: `test/${file.split(".")[1]}`,
        name: `test.${file.split(".")[1]}`,
      };

      const formData = new FormData();
      formData.append("file", newfile);
      formData.append("upload_preset", "votugmno");
      formData.append("tags", tags.join(","));

      return postCloudinary(url, formData)
        .then((data) => {
          const videoData = {
            title: titleText,
            description: descriptionText,
            cloudinary_id: data.asset_id,
            tags: tags,
            username: user.username,
          };

          return postVideoToDatabase(videoData);
        })
        .then(() => {
          setIsLoading(false);
          setImage(null);
          setDescriptionText("");
          setTitleText("");
          setTags([]);

          alert("Your video has been uploaded sucessfully!");
        })
        .catch(console.log);
    }
  }

  const render = () => {
    if (isLoading === false) {
      return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="positions">
          <ScrollView>
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <View style={styles.containerScreen}>
                {image && <Text>Your video is ready to be uploaded</Text>}
                <Button
                  title={
                    image === null
                      ? "Pick an video from gallery"
                      : "Press to change selection"
                  }
                  onPress={pickImage}
                />

                <View>
                  <Text style={{ color: "#888", fontSize: 16 }}>
                    Title for your video:
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Title"
                    onChangeText={(newTitleText) => {
                      setTitleText(newTitleText);
                    }}
                    value={titleText}
                  />
                </View>

                <View style={styles.descriptionContainer}>
                  <Text style={{ color: "#888", fontSize: 16 }}>
                    Description:
                  </Text>
                  <TextInput
                    style={styles.textInputDescription}
                    placeholder="Write a brief description of your video"
                    onChangeText={(newDescriptionText) => {
                      setDescriptionText(newDescriptionText);
                    }}
                    value={descriptionText}
                  />
                </View>

                <View style={styles.tagContainerContainer}>
                  <Text style={{ color: "#888", fontSize: 16 }}>
                    Tags (Add your tag and then press space)
                  </Text>
                  <AddTags setTags={setTags} />
                </View>

                <Button title="Upload" onPress={() => handleUpload(image)} />

                <View></View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      );
    } else {
      return (
        <View style={styles.containerLoading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  };

  return <>{render()}</>;
};

const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  containerLoading: {
    flex: 1, //Keeps the loading wheel in the center of the page
    justifyContent: "center",
    alignContent: "center",
    // flexShrink: 0,
  },

  input: {
    backgroundColor: "#FFFFFF",
    color: "#606060",
    fontWeight: "bold",
  },
  textInputDescription: {
    backgroundColor: "white",
    height: 175,
    width: 350,
    borderRadius: 25,
    paddingLeft: 10,
    marginTop: 10,
  },
  textInput: {
    backgroundColor: "white",
    height: 50,
    width: 350,
    borderRadius: 25,
    paddingLeft: 10,
    marginTop: 10,
  },

  descriptionContainer: {
    margin: 25,
  },
});
