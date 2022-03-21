import { View, Text, StyleSheet, TextInput, Button, Image, Video } from "react-native";
import { useCallback, useState} from "react";
import { useDropzone } from "react-dropzone";
import * as ImagePicker from 'expo-image-picker';


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

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
 

      {/* 

    <DropZone />
    <TextForm (for bio, tags etc.) />
    <ProgressBar />  
  */}
 
};

const styles = StyleSheet.create({
  uploadContainer: {},
});
// function App() {

//   return (
//     <div className="App">
//       <header className="App-header">Upload a photo to cloudinary</header>
//       <div {...getRootProps()}>
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <p>Drop the files here ...</p>
//         ) : (
//           <p>Drag 'n' drop some files here, or click to select files</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;