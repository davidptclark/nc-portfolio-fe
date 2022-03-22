import { Button, Text, TextInput, View } from "react-native";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/Styles";
import { LoginContext } from "../contexts/LoginContext";

const Login = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?",
  });
  const { setUser } = useContext(UserContext);
  const { setLoggedIn } = useContext(LoginContext);
  return (
    <View>
      <Text style={styles.text}>Log in</Text>
      <Text style={styles.text}>Username</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        onChangeText={(newUsername) =>
          setNewUser((currentUser) => {
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
          setNewUser((currentUser) => {
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
          setLoggedIn(true);
          setNewUser({
            username: "",
            password: "",
            bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?",
          });
        }}
        title="Login"
        color="#841584"
        accessibilityLabel="log in"
      />
      <Button
        onPress={() => {}}
        title="Sign Up"
        color="green"
        accessibilityLabel="Sign up"
      />
    </View>
  );
};

export default Login;
