import { NoteType, saveNotes } from "@/api/supabase_api";
import NoteEditor from "@/components/NoteEditor";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function DevotionPage() {
  const { user } = useAuthContext();
  const { link, title, date } = useLocalSearchParams();

  const handleSaveNotes = async (html: string) => {
    saveNotes(
      user,
      html,
      link.toString(),
      "devotion" as NoteType,
      title.toString(),
      date.toString(),
    );
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
      <Text>Devotion Date: {date}</Text>
      <NoteEditor onSaveNotes={handleSaveNotes} />
    </View>
  );
}
