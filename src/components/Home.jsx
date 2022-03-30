import * as api from "../utils/api";
import Likes from "./Likes";
import { View, TouchableOpacity, Text } from "react-native";
import { Video } from "expo-av";
import { Cloudinary } from "@cloudinary/url-gen";
import { useEffect, useState, useRef } from "react";
import { FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
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
    api.getTags().then((apiTags) => {
      setItems(
        apiTags.map(({ tag }) => {
          return { label: tag, value: tag };
        })
      );
    });
  }, []);
  useEffect(() => {
    api.getVideos(tags.join(",")).then((videos) => {
      setVideos(videos);
    });
  }, [tags]);
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
            title: video.title,
            created_at: video.created_at,
            description: video.description,
            tags: video.video_tag_array,
          };
        })}
        renderItem={({ item }) => (
          <>
            {/* {console.log(item)} */}
            <View style={styles.videoContainer}>
              <Text>{item.title}</Text>
              <Video
                style={styles.video}
                source={{
                  uri: item.url,
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
              />
              <Text>{item.description}</Text>
              <Text>{new Date(item.created_at).toLocaleDateString()}</Text>
              <Text>{item.tags}</Text>
              <View style={styles.videoOptionContainer}>
                <Likes item={item} />
                <TouchableOpacity
                  onPress={() => navigation.navigate("Comments", item.id)}
                  style={{ width: "30%" }}
                >
                  <Ionicons name={"chatbubbles-outline"} size={32} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
