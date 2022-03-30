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
        <Text style={styles.videoText}>{item.title}</Text>
        <Video
          style={styles.video}
          source={{
            uri: item.url,
          }}
          resizeMode="stretch"
          isLooping
          useNativeControls={false}
          ref={videoref}
        />
        <View style={styles.videoInfo}>
          <Text style={styles.videoInfoText}>{item.description}</Text>
          <Text style={styles.videoInfoText}>
            {new Date(item.created_at).toLocaleDateString()}
          </Text>
          <Text style={styles.videoInfoText}>{item.tags}</Text>

          <Likes item={item} navigation={navigation} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
