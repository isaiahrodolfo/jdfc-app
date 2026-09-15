import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import sermonData from "../../constants/exampleSermonDataSimple.json";

type Sermon = {
  id: number;
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

  const handleSermonPress = (sermon: Sermon) => {
    // Navigate to a detailed view
    router.push({
      pathname: "/sermons/[id]",
      params: { id: sermon.id, title: sermon.title },
    });
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
        <Pressable key={index} onPress={() => handleSermonPress(sermon)}>
          <Text>{sermon.title}</Text>
          <Text>{sermon.speaker}</Text>
          <Text>{sermon.date}</Text>
          <Text>{sermon.starred ? "⭐" : ""}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { height: 40, borderWidth: 1, borderColor: "#ccc", padding: 10 },
});
