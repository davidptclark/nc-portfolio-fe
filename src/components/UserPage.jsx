import { Text, View, Button } from "react-native";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { LoginContext } from "../contexts/LoginContext";
export default UserPage = () => {
  const { user } = useContext(UserContext);
  const { setLoggedIn } = useContext(LoginContext);
  console.log(user);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{user.username}</Text>
      <Text>Welcome to your profile</Text>
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
