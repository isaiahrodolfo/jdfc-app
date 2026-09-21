import { supabase } from "@/lib/supabase";
import type { Database } from "../../../../database.types";

// Define explicit TypeScript types extracted from the Supabase Schema
export type Lesson = Database["public"]["Tables"]["lessons"]["Row"];

/**
 * Creates a new lesson record in the database.
 *
 * @async
 * @param {string} title - The title of the lesson.
 * @param {string} date - The date the lesson was published or first released.
 * @param {number} seriesId - Optional series ID corresponding to its row in the series table.
 * @returns {Promise<Lesson>} A promise that resolves to the newly created lesson object.
 * @throws Will throw an error if the insert operation fails.
 */
export async function createLesson(
  title: string,
  date: string,
  seriesId?: number,
): Promise<Lesson> {
  console.log("creating lesson");

  const { data: lesson, error: lessonError } = await supabase
    .from("lessons")
    .insert({
      title,
      date,
      series_id: seriesId,
    })
    .select()
    .single();

  if (lessonError) {
    console.log("lesson error", lessonError);
    throw lessonError;
  }

  return lesson;
}
