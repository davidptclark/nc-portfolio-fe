import { Text, View, Image } from "react-native";
import * as api from "../utils/api";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import styles from "../styles/Styles";
import AvatarUrl from "./Avatar";

export default Comments = ({ route }) => {
  const item_id = route.params;
  const [comments, SetComments] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api.GetCommentsByVideoId(item_id).then(({ data }) => {
      SetComments(data);
    });
  }, []);
  // console.log(users, "<<<<users");

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
          <View style={styles.headerComments}>
            <AvatarUrl username={item.username} />
            <Text style={styles.commentAuthor}>{item.username}</Text>
          </View>

          {/* <Image style={styles.avatar_image} source={users[item.username]} /> */}
          {/* <Text style={styles.commentBody}>{Object.values(users)}</Text> */}

          <Text style={styles.commentBody}>{item.comment_body}</Text>

          <Text style={styles.commentDate}>{item.date}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
