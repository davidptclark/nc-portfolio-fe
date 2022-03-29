import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import * as api from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/Styles";

export default DeleteComment = ({
  commentPostedBy,
  setDeletedCommentId,
  commentId,
}) => {
  const { user } = useContext(UserContext);
  const [hasPressed, setHasPressed] = useState(false);
  function handlePress() {
    setHasPressed(true);
    api
      .deleteCommentById(commentId)
      .then(() => {
        setDeletedCommentId(commentId);
        setHasPressed(false);
      })
      .catch(() => {
        alert("Whoops! Something went wrong. Please try deleting again.");
        setHasPressed(false);
      });
  }

  if (user.username === commentPostedBy) {
    return (
      <View style={styles.DeleteButton}>
        <TouchableOpacity
          disabled={hasPressed ? true : false}
          onPress={() => {
            handlePress();
          }}
          style={{ width: "10%" }}
        >
          <Ionicons name={"trash-bin-outline"} size={24} />
        </TouchableOpacity>
      </View>
    );
  } else {
    return <></>;
  }
};
