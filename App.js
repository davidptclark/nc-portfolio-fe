//Libraries and modules
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Components
import styles from "./src/styles/Styles";
import BottomTabNavigator from "./src/navigation/TabNavigation";

//Context
import { UserContext } from "./src/contexts/UserContext";
import { LoginContext } from "./src/contexts/LoginContext";

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?",
    user_type: "Graduate",
  });
  //State used to toggle view of UserProfile nav button
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <UserContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </UserContext.Provider>
    </LoginContext.Provider>
  );
}
