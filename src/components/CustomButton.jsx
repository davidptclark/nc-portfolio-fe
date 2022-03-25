import { Text, View, StyleSheet, Pressable } from "react-native";

export default function CustomButton(props) {
  const { disabled, onPress, title } = props;
  return (
    <Pressable
      disabled={disabled}
      style={disabled ? styles.disabledButton : styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "blue",
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 5,
    marginTop: 5,
  },
  disabledButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "grey",
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 5,
    marginTop: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
