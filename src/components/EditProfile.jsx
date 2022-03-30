import { useContext, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { patchUser } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/Styles";
import CustomButton from "./CustomButton";

function EditProfile({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [newUrl, setNewUrl] = useState(user.avatar_url);
  const [newBio, setNewBio] = useState(user.bio);
  return (
    <View style={styles.editContainer}>
      <Text style={styles.editLabel}>Avatar Url</Text>
      <TextInput
        style={styles.editInput}
        defaultValue={user.avatar_url}
        onChangeText={(newAvatar) => {
          setNewUrl(newAvatar);
        }}
      />
      <Text style={styles.editLabel}>Bio</Text>
      <TextInput
        multiline
        numberOfLines={5}
        maxLength={60}
        style={styles.editInput}
        defaultValue={user.bio}
        onChangeText={(newBio) => {
          setNewBio(newBio);
        }}
      />
      <CustomButton
        title="Save"
        accessibilityLabel="Save"
        disabled={
          !/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
            newUrl
          ) && !(newUrl === "" || newUrl === null)
        }
        onPress={() => {
          setUser((currentUser) => {
            const newUser = { ...currentUser };
            newUser.avatar_url = newUrl;
            newUser.bio = newBio;
            return newUser;
          });
          patchUser({
            username: user.username,
            bio: newBio ? newBio : null,
            avatar_url: newUrl ? newUrl : null,
            social_url: user.social_url ? user.social_url : null,
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
