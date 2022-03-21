import { Text, TextInput, View } from "react-native-web";
import styles from "../styles/Styles";

const Login = () => {
  return (
    <View>
      <Text style={styles.text}>Log in</Text>
      <Text style={styles.text}>Username</Text>
      <TextInput style={styles.textInput} />
      <Text style={styles.text}>Password</Text>
      <TextInput style={styles.textInput} />
    </View>
  );
};

export default Login;
