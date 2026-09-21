import { supabase } from "@/lib/supabase";
import type { Database } from "../../../../database.types";
import { createLesson } from "../lessons/createLesson";

// Define explicit TypeScript types extracted from the Supabase Schema
export type Devotional = Database["public"]["Tables"]["devotionals"]["Row"];

/**
 * Gets a devotional entry by its unique identifier.
 * If it does not exist, automatically creates the associated lesson and devotional entries.
 *
 * @export
 * @async
 * @param {string} uniqueIdentifier - The unique link or identifier for the devotional.
 * @param {string} title - The title of the lesson to create if missing.
 * @param {string} date - The publication date of the lesson if missing.
 * @returns {Promise<Devotional>} A promise that resolves to the retrieved or newly created devotional object.
 * @throws Will throw an error if any database query or mutation fails.
 */
export async function findDevotional(
  uniqueIdentifier: string,
  title: string,
  date: string,
): Promise<Devotional> {
  console.log("checking whether the devotional exists");

  const { data: devotional, error: devotionalError } = await supabase
    .from("devotionals")
    .select("*")
    .eq("link", uniqueIdentifier)
    .maybeSingle();

  if (devotionalError) {
    throw devotionalError;
  }

  // Already exists
  if (devotional) {
    return devotional;
  }

  try {
    console.log("trying to create the lesson");

    // Create the lesson
    const lesson = await createLesson(title, date);

    // Create the devotional using the new lesson
    const { data: newDevotional, error: newDevotionalError } = await supabase
      .from("devotionals")
      .insert({
        link: uniqueIdentifier,
        lesson_id: lesson.id,
      })
      .select()
      .single();

    if (newDevotionalError) {
      throw newDevotionalError;
    }

    return newDevotional;
  } catch (error) {
    console.error("Error creating devotional:", error);
    throw error;
  }
}
