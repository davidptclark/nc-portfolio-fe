import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
  },
  textInput: {
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 2,
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  avatarUrl: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {},
  bio: {},
});
export default styles;
