import * as api from "../utils/api";
import Likes from "./Likes";
import { View, Button } from "react-native";
import { Video } from "expo-av";
import { Cloudinary } from "@cloudinary/url-gen";
import { useEffect, useState, useRef } from "react";
import { FlatList } from "react-native";
import styles from "../styles/Styles";
import DropDownPicker from "react-native-dropdown-picker";

export default Home = ({ navigation }) => {
  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [items, setItems] = useState([
    { label: "Language", value: "language" },
    { label: "Javascript", value: "javascript", parent: "language" },
    { label: "Python", value: "python", parent: "language" },

    { label: "Front End", value: "frontEnd" },
    { label: "React", value: "react", parent: "frontEnd" },
    { label: "React Native", value: "reactNative", parent: "frontEnd" },
    { label: "Back End", value: "backEnd" },
    { label: "Express", value: "express", parent: "backEnd" },
  ]);
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ncapp",
    },
  });

  useEffect(() => {
    api.getVideos().then(({ videos }) => setVideos(videos));
  }, []);

  return (
    <View style={styles.container}>
      <DropDownPicker
        searchable
        placeholder="Tags"
        open={open}
        value={tags}
        items={items}
        setOpen={setOpen}
        setValue={setTags}
        setItems={setItems}
        multiple
      />
      <FlatList
        data={videos.map((video) => {
          return {
            url: cld.video(video.cloudinary_id).toURL(),
            id: video.cloudinary_id,
            votes: video.votes,
          };
        })}
        renderItem={({ item }) => (
          <View style={styles.videoContainer}>
            <Video
              style={styles.video}
              source={{
                uri: item.url,
              }}
              useNativeControls
              resizeMode="contain"
              isLooping
            />
            <View style={styles.videoOptionContainer}>
              <Likes item={item} />
              <Button
                title="Comments"
                onPress={() => navigation.navigate("Comments", item.id)}
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
