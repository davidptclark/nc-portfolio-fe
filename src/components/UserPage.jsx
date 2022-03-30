import { Text, View, Image, ScrollView } from "react-native";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { LoginContext } from "../contexts/LoginContext";
import styles from "../styles/Styles";
import avatar from "../../avatar.jpg";
import CustomButton from "./CustomButton";
export default UserPage = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { setLoggedIn } = useContext(LoginContext);
  const logo = require("../../assets/nc_logo.png");

  return (
    <ScrollView style={styles.loginContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.logoContainer}>
          <Image style={styles.appLogo} source={logo} />
        </View>
        <Image
          style={styles.avatarUrl}
          source={user.avatar_url ? { uri: user.avatarUrl } : avatar}
          defaultSource={avatar}
        />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.userType}>{user.type}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>
      <View>
        <CustomButton
          title="Videos"
          onPress={() => {
            navigation.navigate("User Videos");
          }}
        />
        <CustomButton
          title="Edit"
          onPress={() => {
            navigation.navigate("Edit Profile");
          }}
        />
        <CustomButton
          onPress={() => {
            setLoggedIn(false);
          }}
          title="Sign Out"
          color="red"
          accessibilityLabel="Sign out"
        />
      </View>
    </ScrollView>
  );
};
