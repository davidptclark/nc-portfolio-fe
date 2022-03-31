import { Text, View, Image, ScrollView, Linking } from "react-native";

import styles from "../styles/Styles";
import avatar from "../../avatar.jpg";
import { useEffect, useState } from "react";
import { GetUserByName } from "../utils/api";

export default NonSignedInUser = ({ navigation, route }) => {
  const logo = require("../../assets/nc_logo.png");
  const [user, setUser] = useState({});
  const username = route.params;
  useEffect(() => {
    GetUserByName(username).then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);
  return (
    <ScrollView style={styles.loginContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.logoContainer}>
          <Image style={styles.appLogo} source={logo} />
        </View>
        <Image
          style={styles.avatarUrl}
          source={user.avatar_url ? { uri: user.avatar_url } : avatar}
          defaultSource={avatar}
        />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.userType}>{user.type}</Text>
        <Text
          style={styles.userSocial}
          onPress={() => {
            Linking.canOpenURL(
              user.social_url.slice(0, 8) === "https://"
                ? user.social_url
                : "https://" + user.social_url
            ).then((result) => {
              if (result)
                Linking.openURL(
                  user.social_url.slice(0, 8) === "https://"
                    ? user.social_url
                    : "https://" + user.social_url
                );
            });
          }}
        >
          {user.social_url}
        </Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>
    </ScrollView>
  );
};
