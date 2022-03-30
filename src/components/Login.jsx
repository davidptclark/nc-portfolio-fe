import {
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/Styles";
import { LoginContext } from "../contexts/LoginContext";
import { signinUser } from "../utils/api";
import CustomButton from "./CustomButton";

const Login = ({ navigation }) => {
  const logo = require("../../assets/nc_logo.png");
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });
  const { setUser } = useContext(UserContext);
  const { setLoggedIn } = useContext(LoginContext);

  const loginUser = () => {
    setIsLoading(true);
    signinUser(newUser.username, newUser.password)
      .then((user) => {
        setUser(user);
        setIsLoading(false);
        setLoggedIn(true);
      })
      .catch(({ response: { status } }) => {
        setIsLoading(false);
        if (status === 404) {
          alert("User does not exist");
        } else if (status === 401) {
          alert("Incorrect Password");
        } else {
          alert("Error signing in");
        }
      });
    setNewUser({
      username: "",
      password: "",
    });
  };
  return isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <ScrollView style={styles.loginContainer}>
      <View style={styles.logoContainer}>
        <Image style={styles.appLogo} source={logo} />
      </View>
      <Text style={styles.loginHeaderText}>Log In</Text>
      <Text style={styles.loginLabel}>Username</Text>
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
      <Text style={styles.loginLabel}>Password</Text>
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
      <CustomButton
        disabled={newUser.username === "" || newUser.password === ""}
        onPress={() => {
          loginUser();
        }}
        title="Login"
        accessibilityLabel="log in"
      />
      <CustomButton
        onPress={() => {
          navigation.navigate("Sign Up");
        }}
        title="Sign Up"
        accessibilityLabel="Sign up"
      />
    </ScrollView>
  );
};

export default Login;
