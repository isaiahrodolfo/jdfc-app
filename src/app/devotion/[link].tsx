import { NoteType, saveNotes } from "@/api/supabase_api";
import NoteEditor from "@/components/NoteEditor";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function DevotionPage() {
  const { link, title } = useLocalSearchParams();

  const handleSaveNotes = async (html: string) => {
    saveNotes(html, link.toString(), "devotion" as NoteType);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: title?.toString() || "Devotion",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Text>Devotion Page for link: {link}</Text>
      <NoteEditor onSaveNotes={handleSaveNotes} />
    </View>
  );
}
