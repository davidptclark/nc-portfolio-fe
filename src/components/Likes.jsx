import * as api from "../utils/api";
import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "../styles/Styles";
export default Likes = ({ item, navigation }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [sentVotes, setSentVotes] = useState(0);

  const onPress = ({ id }) => {
    if (!hasVoted) {
      setHasVoted(true);
      setSentVotes(1); //optimistically renders votes to screen
      api.patchVotesByVideoId(1, id).catch(() => {
        setHasVoted(false);
        setSentVotes(0); //removes optimistically renders vote if error
      });
    } else {
      //block allows for removal of previously added vote by pressing icon
      setHasVoted(false);
      setSentVotes(0);
      api.patchVotesByVideoId(-1, id).catch(() => {
        setHasVoted(true);
        setSentVotes(1);
      });
    }
  };
  return (
    <View style={styles.videoOptionContainer}>
      <TouchableOpacity
        onPress={() => {
          onPress(item);
        }}
        style={{ width: "30%" }}
      >
        <Ionicons
          style={styles.videoText}
          name={hasVoted ? "thumbs-up" : "thumbs-up-outline"}
          size={32}
        />
      </TouchableOpacity>
      <Text style={styles.videoText}> Likes: {item.votes + sentVotes} </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Comments", item.id)}
        style={{ width: "30%" }}
      >
        <Ionicons
          style={styles.videoText}
          name={"chatbubbles-outline"}
          size={32}
        />
      </TouchableOpacity>
    </View>
  );
};
