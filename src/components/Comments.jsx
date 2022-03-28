import { Text } from "react-native";
import * as api from "../utils/api";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

export default Comments = ({ route }) => {
  const item_id = route.params;
  const [comments, SetComments] = useState([]);
  useEffect(() => {
    api.GetCommentsByVideoId(item_id).then(({ data }) => SetComments(data));
  }, []);

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
      renderItem={({ item }) => <Text>{item.comment_body}</Text>}
      keyExtractor={(item) => item.id}
    />
  );
};
