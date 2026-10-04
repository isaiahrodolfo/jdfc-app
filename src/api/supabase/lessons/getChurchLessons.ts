import { supabase } from "@/lib/supabase";
import { Json } from "../../../../database.types";

// Define explicit TypeScript types extracted from the Supabase Schema
export type ChurchLesson = {
  id: number;
  lesson_number: number | null;
  title: string | null;
  tags: Json;
};

/**
 * Gets all church lessons by series id
 *
 * @export
 * @async
 * @returns {Promise<ChurchLesson[]>}
 */
export async function getChurchLessons(
  seriesId: number,
): Promise<ChurchLesson[]> {
  const { data, error } = await supabase
    .from("church_lessons")
    .select(
      `
        id, 
        lesson_number, 
        lessons!inner (
          title,
          tags
        ) `,
    )
    .eq("series_id", seriesId);

  if (error || !data) {
    console.log("Church lesson not found", error);
    return [];
  }

  return data.map((lesson) => {
    const title = lesson.lessons.title;
    const tags = lesson.lessons.tags;

    return {
      title: title,
      tags: tags,
      id: lesson.id,
      lesson_number: lesson.lesson_number,
    };
  });
}
