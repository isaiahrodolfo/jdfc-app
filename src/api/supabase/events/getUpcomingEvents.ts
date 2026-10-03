import { supabase } from "@/lib/supabase";

// Define explicit TypeScript types extracted from the Supabase Schema
export type UpcomingEvent = {
  title: string;
  information: string;
  date: Date;
  location: string;
  repeatEveryDays: number | null;
};

/**
 * Gets all live events
 *
 * @export
 * @async
 * @returns {Promise<UpcomingEvent[]>}
 */
export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  // Get all upcoming events which do not have an expired announcement_end date and are not live
  const { data, error } = await supabase
    .from("events")
    .select(
      `
      title,
      information,
      timestamp,
      location,
      repeat_every_days
    `,
    )
    .gte("timestamp", new Date().toISOString());

  if (error || !data) {
    console.log("Upcoming events not found", error);
    return [];
  }

  return data.map((event) => {
    return {
      title: event.title ?? "",
      information: event.information ?? "",
      date: event.timestamp ? new Date(event.timestamp) : new Date(),
      location: event.location ?? "",
      repeatEveryDays: event.repeat_every_days ?? null,
    };
  });
}
