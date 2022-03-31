import * as api from "../utils/api";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import styles from "../styles/Styles";
import { UserContext } from "../contexts/UserContext";
import { LoginContext } from "../contexts/LoginContext";
export default CommentInput = ({ item_id, setNoOfComments }) => {
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(UserContext);
  const { loggedIn } = useContext(LoginContext);
  function handlePress(newComment) {
    if (!loggedIn) {
      alert("You have to be signed in to comment.");
    } else {
      api
        .postCommentByVideoId(item_id, newComment, user.username)
        .then((newComment) =>
          setNoOfComments(newComment.data.postedComment.comment_id),
        )
        .catch(() => {
          alert("Whoops! Something went wrong. Please try posting again.");
        });
    }
  }

  return (
    <View>
      <TextInput
        style={styles.CommentInputBox}
        placeholder="What did you think about the video?"
        onChangeText={(newText) => {
          setNewComment(newText);
        }}
        value={newComment}
      />
      <View style={styles.CommentButton}>
        <TouchableOpacity
          onPress={() => {
            handlePress(newComment);
            setNewComment("");
          }}
          style={{ width: "10%" }}
        >
          <Ionicons name={"send-outline"} size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
