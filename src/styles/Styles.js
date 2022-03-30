import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6dcf0",
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
    padding: 5,
    paddingLeft: 10,
    borderRadius: 50,
    elevation: 3,
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
    margin: 40,
  },
  avatarUrl: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "contain",
  },
  username: {
    fontWeight: "bold",
    fontSize: 20,
  },
  bio: {
    textAlign: "center",
    margin: 10,
  },
  userType: {
    fontWeight: "bold",
  },
  videoContainer: {
    borderWidth: 2, // 2
    padding: 20,
    margin: 10,
  },
  videoOptionContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  loginContainer: {
    margin: 10,
  },
  loginButton: {
    borderRadius: 50,
    borderColor: "red", //black
    paddingBottom: 5,
    paddingTop: 5,
  },
  loginHeaderText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    fontSize: 20,
  },
  loginLabel: {
    color: "black",
    padding: 5,
  },

  editInput: {
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 25,
    padding: 5,
    paddingLeft: 10,
    elevation: 3,
    backgroundColor: "white",
  },

  commentContainer: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#d6dcf0",
    padding: 15,
    margin: 10,
  },
  commentBody: {
    padding: 10,
    fontStyle: "italic",
  },
  commentDetails: {
    padding: 10,
  },
  header: {
    margin: 0,
    padding: 0,
    height: 1,
  },
  signupCheckGood: {
    margin: 5,
    fontSize: 16,
    color: "green",
  },
  signupCheckBad: {
    margin: 5,
    fontSize: 16,
    color: "red",
  },
  commentAuthor: {
    fontStyle: "italic",
    flexDirection: "row",
    fontSize: 10,
    textAlign: "left",
  },
  commentDate: {
    fontStyle: "italic",
    flexDirection: "row",
    fontSize: 10,
    textAlign: "right",
  },
  avatar_image: {
    height: 50,
    width: 50,
  },
});
export default styles;
