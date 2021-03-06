import { Video } from "expo-av";
import styles from "../styles/Styles";
import Likes from "./Likes";
import * as React from "react";
import { useState } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
export default function CustomVideo({ item, navigation, userVideo }) {
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
      <View
        style={userVideo ? styles.userVideoContainer : styles.videoContainer}
      >
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
          <Text style={styles.videoInfoTextUsername}>{item.username}</Text>
          <Text style={styles.videoTitle}>{item.title}</Text>

          <Text style={styles.videoInfoTextDescription}>
            {item.description}
          </Text>

          <Text style={styles.videoInfoTextTags}>
            {item.tags.map((tag) => tag + "  ")}
          </Text>
          <Text style={styles.videoInfoTextDate}>
            {new Date(item.created_at).toLocaleDateString()}
          </Text>

          <Likes item={item} navigation={navigation} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
