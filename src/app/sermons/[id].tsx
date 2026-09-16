import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type PageMode = "description" | "notes";

export default function SermonPage() {
  const [pageMode, setPageMode] = useState<PageMode>("description");
  const { id, title } = useLocalSearchParams();

  const handleTakeNotesPress = () => {
    setPageMode("notes");
  };

  const DescriptionPage = () => (
    <View>
      <Stack.Screen options={{ title: title.toString() || "Default Title" }} />
      <Text>Sermon Page</Text>
      <Text>Sermon ID: {id}</Text>
      <Pressable onPress={handleTakeNotesPress}>
        <Text>Take Notes</Text>
      </Pressable>
    </View>
  );

  const NotesPage = () => (
    <View>
      <Stack.Screen options={{ title: title.toString() || "Default Title" }} />
      <Text>Notes Page</Text>
      <Text>Sermon ID: {id}</Text>
    </View>
  );

  if (pageMode === "description") {
    return <DescriptionPage />;
  } else {
    return <NotesPage />;
  }
}
