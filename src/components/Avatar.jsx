import { Image, View } from "react-native";
import * as api from "../utils/api";
import { useEffect, useState } from "react";
import styles from "../styles/Styles";

export default AvatarUrl = ({ username }) => {
  console.log(username, "username");
  const [url, setUrl] = useState("");
  useEffect(() => {
    api.GetUserByName(username).then((result) => {
      setUrl(result.data.user.avatar_url);
    });
  }, []);
  return (
    <View>
      {url !== "" && (
        <Image
          style={styles.avatar_image}
          source={{
            uri: url,
          }}
        />
      )}
    </View>
  );
};
