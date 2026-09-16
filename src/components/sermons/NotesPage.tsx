import { Stack } from "expo-router";
import { Text, View } from "react-native";
import NoteEditor from "./NoteEditor";
import Slides from "./Slides";

export default function NotesPage({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <View>
      <Stack.Screen options={{ title: title.toString() || "Default Title" }} />
      <Text>Notes Page</Text>
      <Text>Sermon ID: {id}</Text>

      <Slides />
      <NoteEditor />
    </View>
  );
}
