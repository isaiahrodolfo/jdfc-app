import { supabase } from "@/lib/supabase";

/*
 * Get the entry for the devotional in the devotionals table.
 * If it does not exist, create the lesson and devotional entries.
 */
export const findDevotional = async (
  uniqueIdentifier: string,
  title: string,
  date: string,
) => {
  // Check whether the devotional already exists
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
    // Create the lesson
    console.log("trying to create the lesson");

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
};

const createLesson = async (title: string, date: string, seriesId?: number) => {
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
};
