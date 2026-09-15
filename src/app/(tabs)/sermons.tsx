import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import sermonData from "../../constants/exampleSermonDataSimple.json";

type Sermon = {
  title: string;
  speaker: string;
  date: string;
  starred: boolean;
};

export default function Sermons() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sermons, setSermons] = useState<Sermon[]>([]);

  useEffect(() => {
    setSermons(sermonData);
  }, []);

  const handleSearchQueryChange = (text: string) => {
    const filteredSermons = sermonData.filter((sermon) =>
      sermon.title?.toLowerCase().includes(text.toLowerCase()),
    );
    setSermons(filteredSermons);
    setSearchQuery(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search sermons"
        value={searchQuery}
        onChangeText={handleSearchQueryChange}
      />
      {sermons.map((sermon, index) => (
        <View key={index}>
          <Text>{sermon.title}</Text>
          <Text>{sermon.speaker}</Text>
          <Text>{sermon.date}</Text>
          <Text>{sermon.starred ? "⭐" : ""}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { height: 40, borderWidth: 1, borderColor: "#ccc", padding: 10 },
});
