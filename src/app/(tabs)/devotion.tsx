import { Devotional, fetchDevotionals } from "@/api/odb_api";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Devotion() {
  const [searchQuery, setSearchQuery] = useState("");
  const [devotionals, setDevotionals] = useState<Map<string, Devotional>>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDevotionals = async () => {
      try {
        setLoading(true);
        const result = await fetchDevotionals();
        setDevotionals(result);
      } catch (error) {
        console.error("Failed to fetch devotionals:", error);
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    loadDevotionals();
  }, []);

  const handleDevotionPress = (devotional: Devotional) => {
    // Navigate to a detailed view
    router.push({
      pathname: "/devotion/[link]",
      params: {
        link: devotional.odbUrl,
        title: devotional.title,
        date: devotional.dateKey,
      },
    });
  };

  return (
    <View style={styles.container}>
      {devotionals &&
        Array.from(devotionals.values()).map((devotion, index) => (
          <Pressable key={index} onPress={() => handleDevotionPress(devotion)}>
            <Text>{devotion.title}</Text>
          </Pressable>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { height: 40, borderWidth: 1, borderColor: "#ccc", padding: 10 },
});
