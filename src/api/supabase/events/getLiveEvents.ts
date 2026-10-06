import { supabase } from "@/lib/supabase";

// Define explicit TypeScript types extracted from the Supabase Schema
export type LiveEvent = {
  id: number;
  title: string;
  information: string;
  timestamp: string;
  location: string;
  is_live: boolean;
  livestream_link: string | null;
};

/**
 * Gets all live events
 *
 * @export
 * @async
 * @returns {Promise<LiveEvent[]>}
 */
export async function getLiveEvents(): Promise<LiveEvent[]> {
  const { data, error } = await supabase
    .from("events")
    .select(
      `
      id,
      title,
      information,
      timestamp,
      location,
      lessons_events!inner (
        lessons_events_link!inner (
          is_live,
          livestream_link
        )
      )
    `,
    )
    .eq("lessons_events.lessons_events_link.is_live", true);

  if (error || !data) {
    console.log("Live events not found", error);
    return [];
  }

  return data.map((event) => {
    const link = event.lessons_events[0]?.lessons_events_link[0];

    return {
      id: event.id,
      title: event.title ?? "",
      information: event.information ?? "",
      timestamp: event.timestamp ?? "",
      location: event.location ?? "",
      is_live: link?.is_live ?? false,
      livestream_link: link?.livestream_link ?? null,
    };
  });
}
