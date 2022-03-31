import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../components/Home";
import CommentsPage from "../components/CommentsPage";
import NonSignedInUser from "../components/NonSignedInUser";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Projects " component={Home} />
      {/* Trailing space needed now Home is the project page to prevent nesting warnings */}
      <Stack.Screen name="Comments" component={CommentsPage} />
      <Stack.Screen name="User" component={NonSignedInUser} />
    </Stack.Navigator>
  );
};

export { HomeStackNavigator };
