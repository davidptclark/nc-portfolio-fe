import * as api from "../utils/api";

import { Dimensions } from "react-native";
import { View } from "react-native";
import CustomVideo from "./CustomVideo";
import { Cloudinary } from "@cloudinary/url-gen";
import { useEffect, useState, useRef } from "react";
import { FlatList } from "react-native";
import styles from "../styles/Styles";
import DropDownPicker from "react-native-dropdown-picker";

export default Home = ({ navigation }) => {
  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [items, setItems] = useState([]);
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
        }),
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
        dropDownStyle={{
          borderBottomWidth: 2,
          borderTopWidth: 2,
          elevation: 5,
          borderRadius: 0,
        }}
        searchable
        placeholder="Tags"
        open={open}
        value={tags}
        items={items}
        setOpen={setOpen}
        setValue={setTags}
        setItems={setItems}
        multiple
        style={{
          borderRadius: 0,
          borderWidth: 0,
          elevation: 5,
          borderBottomWidth: 2,
          borderTopWidth: 2,
        }}
      />
      <FlatList
        snapToInterval={Dimensions.get("window").height - 180}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
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
          <CustomVideo item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
