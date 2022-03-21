import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import styles from "./Styles";
import Login from "./components/Login";

export default function App() {
  return (
    <View style={styles.container}>
      <Login />
      <StatusBar style="auto" />
    </View>
  );
}
