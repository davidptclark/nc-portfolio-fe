
import { StatusBar } from "expo-status-bar";

import styles from "./src/styles/Styles";
import Login from "./src/components/Login";
import { UserContext } from "./src/contexts/UserContext";
import { useState } from "react";



import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// These are example components to check that the nav bar works

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function UploadScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Upload your video</Text>
    </View>
  );
}

function UserProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>User profile</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
   const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <View style={styles.container}>
        <Login />
        <StatusBar style="auto" />
      </View>
    </UserContext.Provider>
    <NavigationContainer>
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

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "purple",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Upload" component={UploadScreen} />
        <Tab.Screen
          name="Profile"
          component={UserProfileScreen}
          options={{ tabBarBadge: 3 }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

