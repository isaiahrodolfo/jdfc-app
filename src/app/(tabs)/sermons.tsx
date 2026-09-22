import { getSermons, Sermon } from "@/api/supabase/sermons/getSermons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

// import sermonData from "../../constants/exampleSermonDataSimple.json";

export default function Sermons() {
  const [sermons, setSermons] = useState<Sermon[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // TODO: Load is_favorited from users_lessons table, not lessons table
  useEffect(() => {
    const loadSermons = async () => {
      try {
        setLoading(true);
        const result = await getSermons(pageNumber, 50);
        console.log(result);
        setSermons(result.data);
      } catch (error) {
        console.error("Failed to fetch sermons:", error);
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    loadSermons();
  }, []);

  // TODO: Change this to filter sermons on the backend, and show the first 50 items, for example
  const handleSearchQueryChange = (text: string) => {
    const filteredSermons = sermons.filter((sermon) =>
      sermon.title?.toLowerCase().includes(text.toLowerCase()),
    );
    setSermons(filteredSermons);
    setSearchQuery(text);
  };

  const handleSermonPress = (sermon: Sermon) => {
    // Navigate to a detailed view
    router.push({
      pathname: "/sermons/[lessonId]",
      params: {
        ...sermon,
        isLive: sermon.isLive.toString(),
      },
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
          <Text>{sermon.speakerName}</Text>
          <Text>{sermon.date}</Text>
          {/* <Text>{sermon.isFavorited ? "⭐" : ""}</Text> */}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { height: 40, borderWidth: 1, borderColor: "#ccc", padding: 10 },
});
