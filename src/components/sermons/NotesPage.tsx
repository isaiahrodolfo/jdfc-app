import { Stack } from "expo-router";
import { Text, View } from "react-native";
import NoteEditor from "../NoteEditor";
import Slides from "./Slides";

export default function NotesPage({
  lessonId,
  title,
}: {
  lessonId: string;
  title: string;
}) {
  const handleSaveNotes = async () => {
    return;
  };

  return (
    <View>
      <Stack.Screen
        options={{
          title: title.toString() || "Default Title",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Text>Notes Page</Text>
      <Text>Lesson ID: {lessonId}</Text>

      <Slides />
      <NoteEditor initialContent={""} onSaveNotes={handleSaveNotes} />
    </View>
  );
}
