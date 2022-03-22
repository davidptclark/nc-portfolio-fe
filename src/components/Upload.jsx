import { View, Text, StyleSheet, Button, ActivityIndicator } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default Upload = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  function handleSubmit(file) {
    if (file !== null) {
     
      setIsLoading(true);

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
        .then((data) => {
          setIsLoading(false);
          setImage(null);
          console.log(data)
        });
    }
  }

const render = () => {
  if (isLoading === false) {
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
    )
  }
  else{
    return (
      <View style={[styles.container, styles.horizontal]}>
           <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    )
  }
}

  return (
    <>
   {
     render()
   }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  // horizontal: {
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  //   padding: 10
  // }
});

