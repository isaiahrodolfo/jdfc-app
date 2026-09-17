import { getNotes, NoteType, saveNotes } from "@/api/supabase_api";
import NoteEditor from "@/components/NoteEditor";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function DevotionPage() {
  const { user } = useAuthContext();
  const { link, title, date } = useLocalSearchParams();
  const [initialContent, setInitialContent] = useState("");

  useEffect(() => {
    if (!user || !link) {
      return;
    }

    const loadNotes = async () => {
      try {
        const notes = await getNotes(user.id, link.toString());
        setInitialContent(notes);
      } catch (error) {
        console.error("Error loading notes:", error);
      }
    };

    loadNotes();
  }, [user, link]);

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
      <NoteEditor
        onSaveNotes={handleSaveNotes}
        initialContent={initialContent}
      />
    </View>
  );
}
