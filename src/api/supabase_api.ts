import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { findDevotional } from "./supabase_api_helpers";

export type NoteType = "devotionals" | "slideshows";

export async function saveNotes(
  user: User,
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

  if (noteType === "slideshows") return;
  if (!title || !date) return; // Make sure devotionals have a title and a date

  // Find the devotional's link
  try {
    const devotional = await findDevotional(uniqueIdentifier, title, date);

    if (!devotional.lesson_id) {
      console.error("Devotional has no lesson ID");
      return;
    }

    try {
      const { error } = await supabase
        .from("users_lessons")
        .upsert(
          {
            user_id: user.id,
            lesson_id: devotional.lesson_id,
            notes: text,
          },
          {
            onConflict: "user_id,lesson_id",
          },
        )
        .select()
        .single();
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  } catch (error) {
    console.error("Error finding devotional:", error);
  }
}

export const getNotes = async (userId: string, uniqueIdentifier: string) => {
  const { data: devotional, error: devotionalError } = await supabase
    .from("devotionals")
    .select("lesson_id")
    .eq("link", uniqueIdentifier)
    .maybeSingle();

  if (devotionalError) {
    throw devotionalError;
  }

  if (!devotional?.lesson_id) {
    return "";
  }

  const { data, error } = await supabase
    .from("users_lessons")
    .select("notes")
    .eq("user_id", userId)
    .eq("lesson_id", devotional.lesson_id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data?.notes ?? "";
};
