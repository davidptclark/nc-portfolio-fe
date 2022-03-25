import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Tags from "react-native-tags";
export default AddTags = () => {
  return (
    <Tags
      initialText=""
      textInputProps={{
        placeholder: "Add your technology",
      }}
      // initialTags={["JS"]}
      // onChangeTags={(tags) => console.log(tags)}
      // onTagPress={(index, tagLabel, event, deleted) =>
      //   console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
      // }
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
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-evenly",
    width: 300,
  },
  tag: {
    backgroundColor: "#2A5353",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    borderRadius: 25,
  },
  textTag: {
    color: "#EBEBEB",
    fontWeight: "bold",
  },

  tagContainerContainer: {
    margin: 18,
  },
});
