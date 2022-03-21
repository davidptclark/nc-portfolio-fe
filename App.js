import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import styles from "./src/styles/Styles";
import Login from "./src/components/Login";

export default function App() {
  return (
    <View style={styles.container}>
      <Login />
      <StatusBar style="auto" />
    </View>
  );
}
