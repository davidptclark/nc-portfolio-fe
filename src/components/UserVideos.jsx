import { Cloudinary } from "@cloudinary/url-gen";
import { Video } from "expo-av";
import { useEffect, useContext, useState } from "react";
import { View, FlatList } from "react-native";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/Styles";
import { deleteVideo, getVideos } from "../utils/api";
import CustomButton from "./CustomButton";
function UserVideos() {
  const { user } = useContext(UserContext);
  const [videos, setVideos] = useState([]);
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ncapp",
    },
  });
  useEffect(() => {
    getVideos("", "", "", user.username).then(setVideos);
  }, []);
  return (
    <View>
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
            <CustomButton
              title="Delete"
              onPress={() => {
                deleteVideo(item.id)
                  .then(() => {
                    setVideos((currentVideos) => {
                      return currentVideos.filter((video) => {
                        return video.cloudinary_id !== item.id;
                      });
                    });
                  })
                  .catch((err) => {
                    console.log(err.response);
                  });
              }}
            />
          </View>
        )}
      />
    </View>
  );
}

export default UserVideos;
