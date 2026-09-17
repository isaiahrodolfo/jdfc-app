import { useAuthContext } from "@/hooks/use-auth-context";
import { supabase } from "@/lib/supabase";
import { findDevotional } from "./supabase_api_helpers";

export type NoteType = "devotionals" | "slideshows";

export async function saveNotes(
  text: string,
  uniqueIdentifier: string,
  noteType: NoteType,
  title?: string,
  date?: string,
) {
  console.log("saveNotes() was triggered with", {
    text,
    uniqueIdentifier,
    noteType,
  });

  const { user } = useAuthContext();

  if (noteType === "slideshows") return;
  if (!title || !date) return; // Make sure devotionals have a title and a date

  // Find the devotional's link
  try {
    const devotional = await findDevotional(uniqueIdentifier, title, date);

    if (!devotional) {
      console.error("Could not find or create devotional");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("users_lessons")
        .update({ notes: text })
        .eq("user_id", user.id)
        .eq("lesson_id", devotional.lesson_id)
        .select();
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  } catch (error) {
    console.error("Error finding devotional:", error);
  }
}
