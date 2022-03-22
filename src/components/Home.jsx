import { View, Text, StyleSheet, Button } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { Cloudinary } from "@cloudinary/url-gen";
import { useEffect, useState, useRef } from "react";
import { FlatList } from "react-native";
import axios from "axios";
import styles from "../styles/Styles";

export default Home = () => {
  const [videos, setVideos] = useState([]);
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
      <FlatList
        data={videos.map((video) => {
          return {
            url: cld.video(video.public_id).toURL(),
            id: video.public_id,
          };
        })}
        renderItem={({ item }) => (
          <Video
            style={styles.video}
            source={{
              uri: item.url,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
