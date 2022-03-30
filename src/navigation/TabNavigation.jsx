import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeStackNavigator } from "../navigation/StackNavigation";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

import Upload from "../components/Upload";

import Ionicons from "react-native-vector-icons/Ionicons";
import SignInAndUp from "./SignInAndUp";
import User from "./User";

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const { loggedIn } = useContext(LoginContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Projects") {
            iconName = focused ? "code-slash" : "code-slash-outline";
          } else if (route.name === "Upload") {
            iconName = focused ? "cloud-upload" : "cloud-upload-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Projects"
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Upload" component={Upload} />
      <Tab.Screen
        name="Profile"
        component={loggedIn ? User : SignInAndUp} //As above, state will determine what page is rendered
        options={{ headerShown: false }} //Option to show notifications further into the project
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
