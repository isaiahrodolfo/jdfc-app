import { supabase } from "@/lib/supabase";

/*
 * Get the entry for the devotional in the devotionals table.
 * If it does not exist, create the entry for it.
 */
export const findDevotional = async (
  uniqueIdentifier: string,
  title: string,
  date: string,
) => {
  // Check whether the devotional already exists
  const { data: devotional, error: devotionalError } = await supabase
    .from("devotionals")
    .select("*")
    .eq("link", uniqueIdentifier)
    .maybeSingle();

  if (devotionalError) {
    console.error("Error checking devotional:", devotionalError);
    return;
  }

  // Already exists
  if (devotional) {
    return devotional;
  }

  // Get the title and date for the devotional

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
    console.error("Error creating devotional:", newDevotionalError);
    return;
  }

  return newDevotional;
};

const createLesson = async (title: string, date: string, seriesId?: number) => {
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
    console.error("Error creating lesson:", lessonError);
    return;
  }
};
