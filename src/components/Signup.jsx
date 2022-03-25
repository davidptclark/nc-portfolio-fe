import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../styles/Styles";
import CustomButton from "./CustomButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";

function Signup() {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    confirmationPassword: "",
  });
  return (
    <View>
      <Text style={styles.loginLabel}>Username</Text>
      <TextInput style={styles.textInput} placeholder="Username" />
      <Text style={styles.loginLabel}>Password</Text>
      <TextInput style={styles.textInput} placeholder="Password" />
      <Text style={styles.loginLabel}>Confirm Password</Text>
      <TextInput style={styles.textInput} placeholder="Confirm Password" />
      <Ionicons
        name={
          newUser.password === newUser.confirmationPassword
            ? "checkmark-outline"
            : "close-outline"
        }
      >
        Passwords match
      </Ionicons>
      <Ionicons
        name={
          newUser.password.length >= 8 ? "checkmark-outline" : "close-outline"
        }
      >
        {"Passwords Length > 8"}
      </Ionicons>
      <Ionicons name={"checkmark-outline"}>Password Contains A Symbol</Ionicons>
      <Ionicons name={"checkmark-outline"}>Password Contains A Number</Ionicons>
      <Ionicons name={"checkmark-outline"}>
        Password Contains A Uppercase Letter
      </Ionicons>
      <CustomButton title="Sign Up" accessibilityLabel="Sign Up" />
    </View>
  );
}

export default Signup;
