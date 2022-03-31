import React from "react";
import { useState } from "react";
import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import CommentInput from "./CommentInput";
import Comments from "./Comments";

export default CommentsPage = ({ navigation, route }) => {
  const item_id = route.params;
  const [comments, setComments] = useState([]);
  const [noOfComments, setNoOfComments] = useState("");
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <CommentInput
          item_id={item_id}
          comments={comments}
          setComments={setComments}
          setNoOfComments={setNoOfComments}
        />
        <Comments
          item_id={item_id}
          comments={comments}
          setComments={setComments}
          noOfComments={noOfComments}
          navigation={navigation}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
