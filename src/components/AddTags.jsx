import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Tags from "react-native-tags";
export default AddTags = ({ setTags }) => {
  return (
    <Tags
      initialText=""
      textInputProps={{
        placeholder: "Add your technology",
      }}
      onChangeTags={(tags) => {
        setTags(tags);
      }}
      containerStyle={styles.tagContainer}
      inputStyle={{ backgroundColor: "white", color: "black" }}
      renderTag={({ tag, index, onPress }) => (
        <TouchableOpacity
          style={styles.tag}
          key={`${tag}-${index}`}
          onPress={onPress}
        >
          <Text style={styles.textTag}>{tag}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    borderRadius: 25,
    backgroundColor: "#FFFFFF",

    width: 325,
  },
  tag: {
    backgroundColor: "#2A5353",
    borderRadius: 15,
    padding: 6,
    margin: 10,
  },
  textTag: {
    color: "#EBEBEB",
    fontWeight: "bold",
  },
});
