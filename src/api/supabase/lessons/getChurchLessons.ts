import { supabase } from "@/lib/supabase";
import { Json } from "../../../../database.types";

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
        )
      `,
    )
    .eq("series_id", seriesId);

  if (error || !data) {
    console.log("Church lessons not found", error);
    return [];
  }

  return data.map((churchLesson) => ({
    id: churchLesson.id,
    lesson_number: churchLesson.lesson_number,
    title: churchLesson.lessons.title,
    tags: churchLesson.lessons.tags,
  }));
}
