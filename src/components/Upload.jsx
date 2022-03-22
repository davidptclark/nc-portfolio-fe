import { View, Text, StyleSheet, Button, ActivityIndicator, TouchableOpacity } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import Tags from "react-native-tags";

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
          alert("Your video has been uploaded sucessfully!")
          console.log(data)
        });
    }
  }

  const MyTagInput = () => (
    <Tags
      style={styles.container}
      initialText=""
      textInputProps={{
        placeholder: "Add your technology"
      }}
      initialTags={["JS"]}
      onChangeTags={tags => console.log(tags)}
      onTagPress={(index, tagLabel, event, deleted) =>
        console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
      }
      containerStyle={{ justifyContent: "center" }}
      inputStyle={{ backgroundColor: "white" }}
      // tagContainerStyle={styles.tag}
      // tagTextStyle={styles.textTag}
      renderTag={({ tag, index, onPress, readonly }) => (
        <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}
          >
        <Text style={styles.textTag}>{tag}</Text>
 
        </TouchableOpacity>
      )}

    />
  );

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

      {MyTagInput()}
    </View>
    )

  
  }
  else{
    return (
      <View style={styles.container}>
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
   
    justifyContent: "center",
    flexDirection: "column-reverse"
  },
  tag: {
    backgroundColor: '#2A5353',
    borderRadius: 10,
    padding: 5,
    margin: 10,
    maxWidth: 70,

    
  },
  textTag: {
    color: '#EBEBEB',
    fontWeight: 'bold',
  }

});

