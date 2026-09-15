import * as React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function Sermons() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search sermons"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { height: 40, borderWidth: 1, borderColor: "#ccc", padding: 10 },
});
