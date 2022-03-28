import { Text, View, Button, Image } from "react-native";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { LoginContext } from "../contexts/LoginContext";
import styles from "../styles/Styles";
import avatar from "../../avatar.jpg";
import CustomButton from "./CustomButton";
export default UserPage = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { setLoggedIn } = useContext(LoginContext);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style={styles.avatarUrl}
        source={user.avatar_url ? { uri: user.avatarUrl } : avatar}
      />
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.userType}>{user.type}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
      <Button
        title="Edit"
        onPress={() => {
          navigation.navigate("Edit Profile");
        }}
      ></Button>
      <Button
        onPress={() => {
          setLoggedIn(false);
        }}
        title="Sign Out"
        color="red"
        accessibilityLabel="Sign out"
      />
    </View>
  );
};
