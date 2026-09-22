import { supabase } from "@/lib/supabase";
export type NoteType = "devotional" | "slideshow";

/**
 * Gets the note associated with the user and the selected lesson.
 * Returns note, but if the note does not exist or is empty, returns an empty string.
 *
 * @export
 * @async
 * @param {string} userId - the user ID.
 * @param {string} uniqueIdentifier - The link to the devotional (if a devotional), else the ID of the lesson (a slideshow)
 * @param {noteType} NoteType - The type of note, either devotional slideshow
 * @returns {string} The note in HTML text.
 */
export async function getNotes(
  userId: string,
  uniqueIdentifier: string,
  noteType: NoteType,
): Promise<string> {
  let lessonId: number;

  if (noteType === "devotional") {
    const { data: devotional, error: devotionalError } = await supabase
      .from("devotionals")
      .select("lesson_id")
      .eq("link", uniqueIdentifier)
      .single();

    if (devotionalError || !devotional) {
      console.log("Devotional not found");
      return "";
    }

    lessonId = devotional.lesson_id;
  } else {
    lessonId = Number(uniqueIdentifier);
  }

  const { data, error } = await supabase
    .from("users_lessons")
    .select("notes")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .single();

  if (error) {
    throw error;
  }

  return data?.notes ?? "";
}
