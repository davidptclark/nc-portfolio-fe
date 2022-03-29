import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeStackNavigator } from "../navigation/StackNavigation";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import UserPage from "../components/UserPage";
import Upload from "../components/Upload";
import Login from "../components/Login";

import Ionicons from "react-native-vector-icons/Ionicons";
import SignInAndUp from "../components/SignInAndUp";
<<<<<<< HEAD
=======
import User from "./User";
>>>>>>> 81404a3d8eb6c79a1294c27479b33f04b53eb485

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const { loggedIn } = useContext(LoginContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
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
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Upload" component={Upload} />
      <Tab.Screen
        name="Profile"
<<<<<<< HEAD
        component={loggedIn ? UserPage : SignInAndUp} //As above, state will determine what page is rendered
=======
        component={loggedIn ? User : SignInAndUp} //As above, state will determine what page is rendered
>>>>>>> 81404a3d8eb6c79a1294c27479b33f04b53eb485
        options={{ tabBarBadge: 3 }} //Option to show notifications further into the project
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
