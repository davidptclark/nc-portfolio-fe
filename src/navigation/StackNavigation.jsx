import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../components/Home";
import Comments from "../components/Comments";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Projects" component={Home} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
};

export { HomeStackNavigator };
