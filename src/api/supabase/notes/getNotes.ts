import { supabase } from "@/lib/supabase";
export type NoteType = "devotionals" | "slideshows";

/**
 * Gets the note associated with the user and the selected lesson.
 * Returns note, but if the note does not exist or is empty, returns an empty string.
 *
 * @export
 * @async
 * @param {string} userId - the user ID.
 * @param {string} uniqueIdentifier - The link to the devotional (if a devotional), else the ID of the lesson (a slideshow)
 * @returns {string} The note in HTML text.
 */
export async function getNotes(
  userId: string,
  uniqueIdentifier: string,
): Promise<string> {
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
}
