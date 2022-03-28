import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import styles from "../styles/Styles";
import Login from "./Login";
import Signup from "./Signup";

const Stack = createNativeStackNavigator();
function SignInAndUp() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sign In"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Sign Up"
        component={Signup}
        options={{ headerStyle: styles.header }}
      />
    </Stack.Navigator>
  );
}

export default SignInAndUp;
