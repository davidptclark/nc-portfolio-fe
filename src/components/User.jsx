import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import EditProfile from "./EditProfile";
import UserPage from "./UserPage";

const Stack = createNativeStackNavigator();
function User() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User Profile"
        options={{ headerShown: false }}
        component={UserPage}
      />
      <Stack.Screen name="Edit Profile" component={EditProfile} />
    </Stack.Navigator>
  );
}

export default User;
