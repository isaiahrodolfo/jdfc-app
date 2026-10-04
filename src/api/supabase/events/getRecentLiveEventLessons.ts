import { supabase } from "@/lib/supabase";

// Define explicit TypeScript types extracted from the Supabase Schema
export type RecentLiveEventLesson = {
  title: string;
  information: string;
  timestamp: string;
  location: string;
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
      timestamp,
      location,
      lessons_events!inner (
        lessons_events_link!inner (
          livestream_link
        )
      )
    `,
    )
    .gt("timestamp", twoWeeksAgo.toISOString())
    .lt("timestamp", today.toISOString());

  if (error || !data) {
    console.log("Live events not found", error);
    return [];
  }

  console.log(data);

  return data.map((event) => {
    const link = event.lessons_events[0]?.lessons_events_link[0];

    return {
      title: event.title ?? "",
      information: event.information ?? "",
      timestamp: event.timestamp ?? "",
      location: event.location ?? "",
      livestream_link: link?.livestream_link ?? null,
    };
  });
}
