import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import * as api from "../utils/api";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import styles from "../styles/Styles";
import AvatarUrl from "./Avatar";

import DeleteComment from "./DeleteComment";

export default Comments = ({
  item_id,
  setComments,
  comments,
  noOfComments,
  navigation,
}) => {
  const [deletedCommentId, setDeletedCommentId] = useState("");
  useEffect(() => {
    api.GetCommentsByVideoId(item_id).then(({ data }) => setComments(data));
  }, [noOfComments, deletedCommentId]);

  return (
    <FlatList
      data={comments.map((comment) => {
        return {
          comment_body: comment.body,
          username: comment.username,
          date: new Date(comment.created_at).toUTCString(),
          id: comment.comment_id,
        };
      })}
      renderItem={({ item }) => (
        <View style={styles.commentContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("User", item.username);
            }}
          >
            <View style={styles.headerComments}>
              <AvatarUrl username={item.username} />
              <Text style={styles.commentAuthor}>{item.username}</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.commentBody}>{item.comment_body}</Text>

          <Text style={styles.commentDate}>{item.date}</Text>

          <DeleteComment
            setDeletedCommentId={setDeletedCommentId}
            commentPostedBy={item.username}
            commentId={item.id}
          />
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
