import Ionicons from "@expo/vector-icons/Ionicons";
import { Video } from "expo-av";
import styles from "../styles/Styles";
import Likes from "./Likes";
import * as React from "react";
import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
export default function CustomVideo({ item, navigation }) {
  const videoref = React.useRef(null);
  const [playing, setPlaying] = useState(true);

  function onPlayPausePress() {
    if (playing) {
      videoref.current.pauseAsync();
      setPlaying(!playing);
    } else {
      videoref.current.playAsync();
      setPlaying(!playing);
    }
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onPlayPausePress();
      }}
    >
      <View style={styles.videoContainer}>
        <Text>{item.title}</Text>
        <Video
          style={styles.video}
          source={{
            uri: item.url,
          }}
          resizeMode="cover"
          isLooping
          useNativeControls={false}
          ref={videoref}
        />
        <View styles={styles.videoInfo}>
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
      </View>
    </TouchableWithoutFeedback>
  );
}
