import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import devotionData from "../../constants/exampleDevotionDataSimple.json";

type Devotion = {
  link: string;
  title: string;
  date: string;
  starred: boolean;
};

export default function Devotion() {
  const [searchQuery, setSearchQuery] = useState("");
  const [devotions, setDevotions] = useState<Devotion[]>([]);

  useEffect(() => {
    setDevotions(devotionData);
  }, []);

  const handleSearchQueryChange = (text: string) => {
    const filteredDevotions = devotionData.filter((devotion) =>
      devotion.title?.toLowerCase().includes(text.toLowerCase()),
    );
    setDevotions(filteredDevotions);
    setSearchQuery(text);
  };

  const handleDevotionPress = (devotion: Devotion) => {
    // Navigate to a detailed view
    router.push({
      pathname: "/devotion/[link]",
      params: { link: devotion.link, title: devotion.title },
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search devotions"
        value={searchQuery}
        onChangeText={handleSearchQueryChange}
      />
      {devotions.map((devotion, index) => (
        <Pressable key={index} onPress={() => handleDevotionPress(devotion)}>
          <Text>{devotion.title}</Text>
          <Text>{devotion.date}</Text>
          <Text>{devotion.starred ? "⭐" : ""}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { height: 40, borderWidth: 1, borderColor: "#ccc", padding: 10 },
});
