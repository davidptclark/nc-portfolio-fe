import { Text, View } from "react-native";
import React from "react";
import * as api from "../utils/api";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import styles from "../styles/Styles";

export default Comments = ({
  item_id,
  setComments,
  comments,
  noOfComments,
}) => {
  useEffect(() => {
    api.GetCommentsByVideoId(item_id).then(({ data }) => setComments(data));
  }, [noOfComments]);

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
          <Text style={styles.commentBody}>{item.comment_body}</Text>
          <Text style={styles.commentDetails}>
            {item.username}
            {"\n"}
            {item.date}
          </Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
