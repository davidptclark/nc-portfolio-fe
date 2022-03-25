import { View, Text, StyleSheet, Button } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { Cloudinary } from "@cloudinary/url-gen";
import { useEffect, useState, useRef } from "react";
import { FlatList } from "react-native";
import axios from "axios";
import styles from "../styles/Styles";
import DropDownPicker from "react-native-dropdown-picker";

export default Home = () => {
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
      cloudName: "ncfiveguysuk",
    },
  });
  useEffect(() => {
    axios
      .get(
        "http://394232959681238:rpEav_7-j09FtUQgWOVp69WmTW4@res.cloudinary.com/ncfiveguysuk/video/list/test.json"
      )
      .then((res) => {
        setVideos(res.data.resources);
      });
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
            url: cld.video(video.public_id).toURL(),
            id: video.public_id,
          };
        })}
        renderItem={({ item }) => (
          <View style={{ borderWidth: 2, padding: 20, margin: 10 }}>
            <Video
              style={styles.video}
              source={{
                uri: item.url,
              }}
              useNativeControls
              resizeMode="contain"
              isLooping
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
