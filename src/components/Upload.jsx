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
import CustomButton from "./CustomButton";

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
    if (!file) {
      alert("Pick a video before uploading");
      return;
    }
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
          cloudinary_id: data.asset_id,
          tags: tags,
          username: user.username,
        };

        return postVideoToDatabase(videoData, url, formData);
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
            <CustomButton
              title={
                video === null
                  ? "Pick an video from gallery"
                  : "Press to change selection"
              }
              onPress={pickVideo}
            />

            <View style={styles.textContainer}>
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
                multiline={true}
                style={styles.textInputDescription}
                placeholder="Write a brief description of your video"
                onChangeText={(newDescriptionText) => {
                  setDescriptionText(newDescriptionText);
                }}
                value={descriptionText}
              />
            </View>

            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>
                Tags: (Add your tag and then press space)
              </Text>
              <AddTags setTags={setTags} />
            </View>

            <CustomButton title="Upload" onPress={() => handleUpload(video)} />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerScreen: {
    padding: 10,
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    textAlignVertical: "top",
    backgroundColor: "white",
    height: 175,

    borderRadius: 25,

    marginTop: 10,
  },
  textInput: {
    backgroundColor: "white",
    height: 50,

    borderRadius: 25,
    paddingLeft: 10,
    marginTop: 10,
  },
  descriptionContainer: {
    marginVertical: 15,
  },
  textContainer: { marginVertical: 15 },

  tagContainer: {
    marginVertical: 15,
    margin: 0,
    padding: 0,
  },
  tagText: { color: "#888", fontSize: 16, marginBottom: 10 },
  notLoggedInContainer: {
    height: "100%",

    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  notLoggedInText: {
    backgroundColor: "purple",
    color: "white",
    paddingHorizontal: "15%",
    padding: 10,
    borderRadius: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
});
