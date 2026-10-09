import { supabase } from "@/lib/supabase";

// Define explicit TypeScript types extracted from the Supabase Schema
export type RecentLiveEventLesson = {
  lessonId: number;
  title: string;
  information: string;
  timestamp_start: string;
  timestamp_end: string;
  location: string;
  is_online: boolean;
  livestream_link: string | null;
};

/**
 * Gets all live events
 *
 * @export
 * @async
 * @returns {Promise<RecentLiveEventLesson[]>}
 */
export async function getRecentLiveEventLessons(): Promise<
  RecentLiveEventLesson[]
> {
  const today = new Date();
  const twoWeeksAgo = new Date(today);
  twoWeeksAgo.setDate(today.getDate() - 14);

  const { data, error } = await supabase
    .from("events")
    .select(
      `
      title,
      information,
      timestamp_start,
      timestamp_end,
      location,
      is_online,
      lessons_events!inner (
        lesson_id,
        lessons_events_link!inner (
          livestream_link
        )
      )
    `,
    )
    .gt("timestamp_start", twoWeeksAgo.toISOString())
    .lt("timestamp_start", today.toISOString());

  if (error || !data) {
    console.log("Live events not found", error);
    return [];
  }

  return data.map((event) => {
    const link = event.lessons_events[0]?.lessons_events_link[0];

    return {
      lessonId: event.lessons_events[0].lesson_id, // this is ok because there is a unique constraint on events and lessons
      title: event.title ?? "",
      information: event.information ?? "",
      timestamp_start: event.timestamp_start ?? "",
      timestamp_end: event.timestamp_end ?? "",
      location: event.location ?? "",
      is_online: event.is_online ?? false,
      livestream_link: link?.livestream_link ?? null,
    };
  });
}
