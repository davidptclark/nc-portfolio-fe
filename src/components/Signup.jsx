import { useContext } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import styles from "../styles/Styles";
import CustomButton from "./CustomButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import bcrypt from "react-native-bcrypt";
import { postUser } from "../../api";
import { UserContext } from "../contexts/UserContext";
import { LoginContext } from "../contexts/LoginContext";

function Signup() {
  const symbolRegex = /[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]/;
  const numberRegex = /[0-9]/;
  const uppercaseRegex = /[A-Z]/;
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    confirmationPassword: "",
  });
  const [isLoading, setIsloading] = useState(false);
  const { setUser } = useContext(UserContext);
  const { setLoggedIn } = useContext(LoginContext);

  const addUser = () => {
    setIsloading(true);
    console.log("running");
    new Promise((resolve, reject) => {
      bcrypt.hash(newUser.password, 5, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    })
      .then((hash) => {
        return postUser(newUser.username, hash, "graduate");
      })
      .then((user) => {
        setIsloading(false);
        console.log(user);
        setUser(user);
        setLoggedIn(true);
      });
  };
  return isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <ScrollView>
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
      <Text style={styles.loginLabel}>Confirm Password</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Confirm Password"
        onChangeText={(newConfirm) =>
          setNewUser((currentUser) => {
            const newUser = { ...currentUser };
            newUser.confirmationPassword = newConfirm;
            return newUser;
          })
        }
        secureTextEntry
      />
      <Ionicons
        style={
          newUser.password === newUser.confirmationPassword
            ? styles.signupCheckGood
            : styles.signupCheckBad
        }
        name={
          newUser.password === newUser.confirmationPassword
            ? "checkmark-outline"
            : "close-outline"
        }
      >
        Passwords match
      </Ionicons>
      <Ionicons
        style={
          newUser.password.length >= 8
            ? styles.signupCheckGood
            : styles.signupCheckBad
        }
        name={
          newUser.password.length >= 8 ? "checkmark-outline" : "close-outline"
        }
      >
        {"Passwords Length > 8"}
      </Ionicons>
      <Ionicons
        style={
          symbolRegex.test(newUser.password)
            ? styles.signupCheckGood
            : styles.signupCheckBad
        }
        name={
          symbolRegex.test(newUser.password)
            ? "checkmark-outline"
            : "close-outline"
        }
      >
        Password Contains A Symbol
      </Ionicons>
      <Ionicons
        style={
          numberRegex.test(newUser.password)
            ? styles.signupCheckGood
            : styles.signupCheckBad
        }
        name={
          numberRegex.test(newUser.password)
            ? "checkmark-outline"
            : "close-outline"
        }
      >
        Password Contains A Number
      </Ionicons>
      <Ionicons
        style={
          uppercaseRegex.test(newUser.password)
            ? styles.signupCheckGood
            : styles.signupCheckBad
        }
        name={
          uppercaseRegex.test(newUser.password)
            ? "checkmark-outline"
            : "close-outline"
        }
      >
        Password Contains A Uppercase Letter
      </Ionicons>
      <CustomButton
        disabled={
          !(
            newUser.username !== "" &&
            uppercaseRegex.test(newUser.password) &&
            numberRegex.test(newUser.password) &&
            symbolRegex.test(newUser.password) &&
            newUser.password.length >= 8 &&
            newUser.password === newUser.confirmationPassword
          )
        }
        title="Sign Up"
        accessibilityLabel="Sign Up"
        onPress={() => {
          addUser();
        }}
      />
    </ScrollView>
  );
}

export default Signup;
