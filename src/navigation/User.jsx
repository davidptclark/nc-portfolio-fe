import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import EditProfile from "../components/EditProfile";
import UserPage from "../components/UserPage";
import UserVideos from "../components/UserVideos";

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
      <Stack.Screen name="User Videos" component={UserVideos} />
    </Stack.Navigator>
  );
}

export default User;
