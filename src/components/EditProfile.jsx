import { useContext, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/Styles";
import CustomButton from "./CustomButton";

function EditProfile() {
  const [newUrl, setNewUrl] = useState("");
  const { user } = useContext(UserContext);
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
      <CustomButton title="Save" />
    </View>
  );
}

export default EditProfile;
