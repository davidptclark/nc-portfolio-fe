import { View, Text, StyleSheet, TextInput, Button, Video } from "react-native";
import { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default Upload = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  function handleSubmit(file) {
    if (file !== null) {
      const url = `https://api.cloudinary.com/v1_1/ncfiveguysuk/auto/upload`;

      let newfile = {
        uri: file,
        type: `test/${file.split(".")[1]}`,
        name: `test.${file.split(".")[1]}`,
      };

      const formData = new FormData();
      formData.append("file", newfile);
      formData.append("upload_preset", "jycjtlpe");
      formData.append("tags", "test");

      fetch(url, {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {image && <Text>Your video is ready to be uploaded</Text>}
      <Button
        title={
          image === null
            ? "Pick an image from camera roll"
            : "Press to change selection"
        }
        onPress={pickImage}
      />
      <Button title="Upload" onPress={() => handleSubmit(image)} />
    </View>
  );
};

const styles = StyleSheet.create({
  uploadContainer: {},
});
