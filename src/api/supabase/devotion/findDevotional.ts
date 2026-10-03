import { supabase } from "@/lib/supabase";
import type { Database } from "../../../../database.types";
import { createLesson } from "../lessons/createLesson";
import getCompletion from "../lessons/getCompletion";

// Define explicit TypeScript types extracted from the Supabase Schema
export type Devotional =
  Database["public"]["Tables"]["devotion_lessons"]["Row"];

type FindDevotionalProps = {
  uniqueIdentifier: string;
  title: string;
  date: string;
  userId?: string;
};

/**
 * Gets a devotional's lesson id and completion status by its unique identifier.
 * If it does not exist, automatically creates the associated lesson and devotional entries.
 *
 * @export
 * @async
 * @param {string} uniqueIdentifier
 * @param {string} title
 * @param {string} date
 * @param {?string} [userId]
 * @returns {Promise<{
 *   lessonId: number;
 *   isCompleted: boolean;
 * }>}
 */
export async function findDevotional(
  uniqueIdentifier: string,
  title: string,
  date: string,
  userId?: string,
): Promise<{
  lessonId: number;
  isCompleted: boolean;
}> {
  if (!userId) {
    console.log(
      "Warning: userId is not provided. Completion status will default to false.",
    );
  }

  let isCompleted = false;

  const { data: devotional, error: devotionalError } = await supabase
    .from("devotion_lessons")
    .select("*")
    .eq("odb_link", uniqueIdentifier)
    .maybeSingle();

  if (devotionalError) {
    throw devotionalError;
  }

  // Already exists
  if (devotional && devotional.lesson_id) {
    if (userId) isCompleted = await getCompletion(devotional.lesson_id, userId);

    return {
      lessonId: devotional.lesson_id,
      isCompleted: isCompleted ?? false,
    };
  }

  try {
    // console.log("trying to create the lesson");

    // Create the lesson
    const lesson = await createLesson(title);

    // Create the devotional using the new lesson
    const { data: newDevotional, error: newDevotionalError } = await supabase
      .from("devotion_lessons")
      .insert({
        odb_link: uniqueIdentifier,
        lesson_id: lesson.id,
        date: new Date(date).toISOString(),
      })
      .select()
      .single();

    if (!newDevotional || !newDevotional.lesson_id || newDevotionalError) {
      throw newDevotionalError;
    }

    if (userId)
      isCompleted = await getCompletion(newDevotional.lesson_id, userId);

    return {
      lessonId: newDevotional.lesson_id,
      isCompleted: isCompleted ?? false,
    };
  } catch (error) {
    console.error("Error creating devotional:", error);
    throw error;
  }
}
