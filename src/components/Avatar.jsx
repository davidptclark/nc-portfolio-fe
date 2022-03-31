import { Image, View } from "react-native";
import * as api from "../utils/api";
import { useEffect, useState } from "react";
import styles from "../styles/Styles";

export default AvatarUrl = ({ username }) => {
  const [url, setUrl] = useState("default");
  useEffect(() => {
    api.GetUserByName(username).then((result) => {
      setUrl(result.data.user.avatar_url);
    });
  }, []);

  return (
    <View>
      <Image
        style={styles.avatar_image}
        source={
          url
            ? {
                uri: url,
              }
            : require("../../avatar.jpg")
        }
      />
    </View>
  );
};
