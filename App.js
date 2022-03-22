import Upload from "./src/components/Upload";
import styles from "./src/styles/Styles";
import Login from "./src/components/Login";
import { UserContext } from "./src/contexts/UserContext";
import { useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./src/components/Home";

// These are example components to check that the nav bar works

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
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <UserContext.Provider value={{ user, setUser }}>
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
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Upload" component={Upload} />
          <Tab.Screen
            name="Profile"
            component={loggedIn ? UserProfileScreen : Login}
            options={{ tabBarBadge: 3 }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
