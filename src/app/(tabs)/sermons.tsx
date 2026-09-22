import { Sermon } from "@/api/supabase/sermons/getSermons";
import { useSermonsPageContext } from "@/hooks/use-sermons-page-context";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

// import sermonData from "../../constants/exampleSermonDataSimple.json";

export default function Sermons() {
  const {
    sermons,
    setSermons,
    isLoading,
    error,
    pageNumber,
    searchQuery,
    handleSearchQueryChange,
    handleChangePage,
  } = useSermonsPageContext();

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
      {/* toasts */}
      <Text>Loading?: {isLoading}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { height: 40, borderWidth: 1, borderColor: "#ccc", padding: 10 },
});
