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
import { LoginContext } from "../contexts/LoginContext";
import * as ImagePicker from "expo-image-picker";

import { postCloudinary, postVideoToDatabase } from "../utils/api";

import AddTags from "./AddTags";

export default Upload = ({ navigation }) => {
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [tags, setTags] = useState([]);
  const { user } = useContext(UserContext);
  const { loggedIn } = useContext(LoginContext);

  const pickVideo = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setVideo(result.uri);
    }
  };

  function handleUpload(file) {
    if (file !== null) {
      setIsLoading(true);

      const url = `https://api.cloudinary.com/v1_1/ncapp/auto`;

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
            cloudinary_id: data.public_id,
            tags: tags,
            username: user.username,
          };

          return postVideoToDatabase(videoData);
        })
        .then(() => {
          setIsLoading(false);
          setVideo(null);
          setDescriptionText("");
          setTitleText("");
          setTags([]);

          alert("Your video has been uploaded sucessfully!");
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  if (!loggedIn) {
    return (
      <View style={styles.notLoggedInContainer}>
        <Text
          style={styles.notLoggedInText}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          Log in before uploading a video.
        </Text>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="positions">
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.containerScreen}>
            {video && <Text>Your video is ready to be uploaded</Text>}
            <Button
              title={
                video === null
                  ? "Pick an video from gallery"
                  : "Press to change selection"
              }
              onPress={pickVideo}
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
              <Text style={{ color: "#888", fontSize: 16 }}>Description:</Text>
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

            <Button title="Upload" onPress={() => handleUpload(video)} />

            <View></View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
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
  notLoggedInContainer: {
    height: "100%",

    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  notLoggedInText: {
    backgroundColor: "blue",
    color: "white",
    paddingHorizontal: "15%",
    padding: 10,
    borderRadius: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
});
