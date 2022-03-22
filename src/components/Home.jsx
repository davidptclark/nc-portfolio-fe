import { View, Text, StyleSheet } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { Cloudinary } from "@cloudinary/url-gen";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

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
    <View style={homeContainer}>
      <FlatList
        data={videos.map((video) => {
          return cld.video(video.public_id).toURL();
        })}
        renderItem={({ item }) => (
          <Video
            source={{
              uri: item,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {},
});
