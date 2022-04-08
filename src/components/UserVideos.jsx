import { Cloudinary } from "@cloudinary/url-gen";
import { Dimensions } from "react-native";
import { useEffect, useContext, useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { UserContext } from "../contexts/UserContext";

import { getVideos } from "../utils/api";
import CustomUserVideo from "./CustomUserVideo";
function UserVideos({ navigation }) {
  const { user } = useContext(UserContext);
  const [videos, setVideos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ncapp",
    },
  });
  useEffect(() => {
    getVideos("", "", "", user.username).then(setVideos);
  }, []);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = () => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  };

  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        snapToInterval={Dimensions.get("window").height - 130}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        keyExtractor={(item) => item.id}
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
          <CustomUserVideo
            item={item}
            navigation={navigation}
            userVideo={true}
            setVideos={setVideos}
          />
        )}
      />
    </View>
  );
}

export default UserVideos;
