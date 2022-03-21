import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import styles from "./src/styles/Styles";
import Login from "./src/components/Login";
import { UserContext } from "./src/contexts/UserContext";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <View style={styles.container}>
        <Login />
        <StatusBar style="auto" />
      </View>
    </UserContext.Provider>
  );
}
