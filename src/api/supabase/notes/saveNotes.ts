import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { findDevotional } from "../devotion/findDevotional";
export type NoteType = "devotional" | "slideshow";

/**
 * Save user-written notes in the users_lessons table.
 *
 * The `title` and `date` parameters are only used with devotionals, never slideshows
 *f
 * @export
 * @async
 * @param {User} user - The user object.
 * @param {string} text - The notes in HTML format.
 * @param {string} uniqueIdentifier - The link to the devotional (if a devotional), else the ID of the lesson (a slideshow)
 * @param {NoteType} noteType - The type of note (devotional or slideshow)
 * @param {?string} [title] - The title of the devotion.
 * @param {?string} [date] - The date of the devotion.
 * @throws Will throw an error if any database query or mutation fails.
 */
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

  // NoteType = "slideshow"
  if (noteType === "slideshow") {
    try {
      const { error } = await supabase
        .from("users_lessons")
        .upsert(
          {
            user_id: user.id,
            lesson_id: Number(uniqueIdentifier),
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
  }

  // NoteType = "devotional"
  if (!title || !date) return; // Make sure devotionals have a title and a date
  // TODO: Write the code for saving slideshows

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
