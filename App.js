//Libraries and modules
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//Components
import Home from "./src/components/Home";
import UserPage from "./src/components/UserPage";
import Upload from "./src/components/Upload";
import styles from "./src/styles/Styles";
import Login from "./src/components/Login";

//Context
import { UserContext } from "./src/contexts/UserContext";
import { LoginContext } from "./src/contexts/LoginContext";
import SignInAndUp from "./src/components/SignInAndUp";

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState({});
  //State used to toggle view of UserProfile nav button
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
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
                  iconName = focused
                    ? "person-circle"
                    : "person-circle-outline";
                }
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
              component={loggedIn ? UserPage : SignInAndUp} //As above, state will determine what page is rendered
              options={{ tabBarBadge: 3 }} //Option to show notifications further into the project
            />
          </Tab.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </LoginContext.Provider>
  );
}
