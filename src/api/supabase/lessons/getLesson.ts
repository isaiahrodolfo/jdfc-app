import { supabase } from "@/lib/supabase";
import { Json } from "../../../../database.types";

export type Lesson = {
  id: number;
  publicTags: Json;
  userTags: Json | null;
  notes: string;
  completion: boolean | null;
  livestreamLink: string | null;
  isLive: boolean;
  slidesLink: string | null;
  speakerId: string | null;
};

/**
 * Gets a lesson by lesson id.
 */
export async function getLesson(
  lessonId: number,
  userId?: string,
): Promise<Lesson> {
  let query = supabase
    .from("lessons")
    .select(
      `
      id,
      tags,
      users_lessons (
        tags,
        notes
      ),
      users_lessons_completions (
        is_completed
      ),
      lessons_events!inner (
        lessons_events_link (
          livestream_link,
          is_live
        ),
        lessons_events_slides (
          slides_link
        ),
        lessons_events_speakers (
          user_id
        )
      )
    `,
    )
    .eq("id", lessonId);

  // Only filter the user's related rows when a user ID was provided.
  if (userId) {
    query = query.eq("users_lessons.user_id", userId);
  }

  // The lesson ID is unique, so there can only be one lesson.
  const { data: lesson, error } = await query.single();

  if (error) throw error;

  const lessonEvent = lesson.lessons_events[0];
  const userLesson = lesson.users_lessons[0];
  const completion = lesson.users_lessons_completions[0];
  const eventLink = lessonEvent?.lessons_events_link[0];
  const eventSlides = lessonEvent?.lessons_events_slides[0];
  const eventSpeaker = lessonEvent?.lessons_events_speakers[0];

  return {
    id: lesson.id,
    publicTags: lesson.tags,
    userTags: userLesson?.tags ?? {},
    notes: userLesson?.notes ?? "",
    completion: completion?.is_completed ?? false,
    livestreamLink: eventLink?.livestream_link ?? "",
    isLive: eventLink?.is_live ?? false,
    slidesLink: eventSlides?.slides_link ?? "",
    speakerId: eventSpeaker?.user_id ?? null,
  };
}
