import { getNotes, NoteType } from "@/api/supabase/notes/getNotes";
import { saveNotes } from "@/api/supabase/notes/saveNotes";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
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
  const { user } = useAuthContext();
  const [initialContent, setInitialContent] = useState("");
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(false);
  const [isLoadingSaveData, setIsLoadingSaveData] = useState(false);

  useEffect(() => {
    setIsLoadingInitialData(true);

    if (!user || !lessonId) {
      return;
    }

    const loadNotes = async () => {
      try {
        const notes = await getNotes(
          user.id,
          lessonId,
          "slideshow" as NoteType,
        );
        setInitialContent(notes);
      } catch (error) {
        console.error("Error loading notes:", error);
      } finally {
        setIsLoadingInitialData(false);
      }
    };

    loadNotes();
  }, [user, lessonId]);

  const handleSaveNotes = async (html: string) => {
    setIsLoadingSaveData(true);

    try {
      await saveNotes(user, html, lessonId, "slideshow" as NoteType);
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
          title: title.toString() || "Default Title",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Text>Notes Page</Text>
      <Text>Lesson ID: {lessonId}</Text>

      <Slides />
      <NoteEditor
        initialContent={initialContent}
        onSaveNotes={handleSaveNotes}
      />

      {/* toasts */}
      <Text>initial data loading: {isLoadingInitialData.toString()}</Text>
      <Text>save data loading: {isLoadingSaveData.toString()}</Text>
    </View>
  );
}
