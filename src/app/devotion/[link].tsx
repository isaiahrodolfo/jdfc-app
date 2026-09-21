import { getNotes } from "@/api/supabase/notes/getNotes";
import { NoteType, saveNotes } from "@/api/supabase/notes/saveNotes";
import NoteEditor from "@/components/NoteEditor";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function DevotionPage() {
  const { user } = useAuthContext();
  const { link, title, date } = useLocalSearchParams();
  const [initialContent, setInitialContent] = useState("");
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
  const [isLoadingSaveData, setIsLoadingSaveData] = useState(false);

  useEffect(() => {
    setIsLoadingInitialData(true);

    if (!user || !link) {
      return;
    }

    const loadNotes = async () => {
      try {
        const notes = await getNotes(user.id, link.toString());
        setInitialContent(notes);
      } catch (error) {
        console.error("Error loading notes:", error);
      } finally {
        setIsLoadingInitialData(false);
      }
    };

    loadNotes();
  }, [user, link]);

  const handleSaveNotes = async (html: string) => {
    setIsLoadingSaveData(true);

    try {
      await saveNotes(
        user,
        html,
        link.toString(),
        "devotion" as NoteType,
        title.toString(),
        date.toString(),
      );
    } catch (error) {
      console.error("Error saving notes:", error);
    } finally {
      setIsLoadingSaveData(false);
    }
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
      {/* toasts */}
      <Text>initial data loading: {isLoadingInitialData.toString()}</Text>
      <Text>save data loading: {isLoadingSaveData.toString()}</Text>
    </View>
  );
}
