import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { handleUpload } from "../../api";

import AddTags from "./AddTags";

export default Upload = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");

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

  // const MyTagInput = () => (
  //   <Tags
  //     initialText=""
  //     textInputProps={{
  //       placeholder: "Add your technology",
  //     }}
  //     // initialTags={["JS"]}
  //     // onChangeTags={(tags) => console.log(tags)}
  //     // onTagPress={(index, tagLabel, event, deleted) =>
  //     //   console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
  //     // }
  //     containerStyle={styles.tagContainer}
  //     inputStyle={{ backgroundColor: "white", color: "black" }}
  //     renderTag={({ tag, index, onPress }) => (
  //       <TouchableOpacity
  //         style={styles.tag}
  //         key={`${tag}-${index}`}
  //         onPress={onPress}
  //       >
  //         <Text style={styles.textTag}>{tag}</Text>
  //       </TouchableOpacity>
  //     )}
  //   />
  // );

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
                      ? "Pick an image from camera roll"
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
                  <AddTags />
                </View>

                <Button
                  title="Upload"
                  onPress={() => handleUpload(image, setIsLoading, setImage)}
                />

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
