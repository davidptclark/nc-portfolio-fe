import { Button, Text, TextInput, View } from "react-native-web";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/Styles";

const Login = () => {
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const { setUser } = useContext(UserContext);
  return (
    <View>
      <Text style={styles.text}>Log in</Text>
      <Text style={styles.text}>Username</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        onChangeText={(newUsername) =>
          setUser((currentUser) => {
            const newUser = { ...currentUser };
            newUser.username = newUsername;
            return newUser;
          })
        }
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        onChangeText={(newPassword) =>
          setUser((currentUser) => {
            const newUser = { ...currentUser };
            newUser.password = newPassword;
            return newUser;
          })
        }
        secureTextEntry
      />
      <Button
        onPress={() => {
          setUser(newUser);
          setNewUser({ username: "", password: "" });
        }}
        title="Login"
        color="#841584"
        accessibilityLabel="log in"
      />
    </View>
  );
};

export default Login;
