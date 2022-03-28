import { useContext, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { patchUser } from "../../api";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/Styles";
import CustomButton from "./CustomButton";

function EditProfile({ navigation }) {
  const [newUrl, setNewUrl] = useState("");
  const { user, setUser } = useContext(UserContext);
  return (
    <View>
      <Text>Avatar Url</Text>
      <TextInput
        style={styles.editInput}
        defaultValue={user.avatar_url}
        onChangeText={(newAvatar) => {
          setNewUrl(newAvatar);
        }}
      />
      <CustomButton
        title="Save"
        accessibilityLabel="Save"
        onPress={() => {
          setUser((currentUser) => {
            const newUser = { ...currentUser };
            newUser.avatar_url = newUrl;
            return newUser;
          });
          patchUser({
            username: user.username,
            bio: user.bio ? user.bio : " ",
            avatar_url: newUrl,
            social_url: user.social_url ? user.social_url : "www.example.com",
          })
            .then(() => {
              navigation.navigate("User Profile");
            })
            .catch((err) => {
              console.log(err.response);
            });
        }}
      />
    </View>
  );
}

export default EditProfile;
