import { supabase } from "@/lib/supabase";
import getUserNextTrackAndModule from "../profile/getUserNextTrackAndModule";

export type UpcomingEvent = {
  id: number;
  title: string;
  information: string;
  timestamp_start: Date;
  timestamp_end: Date;
  location: string;
  is_online: boolean;
  repeatEveryDays: number | null;
  eventTypeId: number | null;
  lifeGroupId: number | null;
};

type getUpcomingEventsProps = {
  userId?: string;
  lifeGroupId?: number | null;
};

/**
 * Get all upcoming events, filtering as necessary based on user
 *
 * @export
 * @async
 * @param {getUpcomingEventsProps} param0
 * @param {string} param0.userId
 * @param {number} param0.lifeGroupId
 * @returns {Promise<UpcomingEvent[]>}
 */
export async function getUpcomingEvents({
  userId,
  lifeGroupId,
}: getUpcomingEventsProps): Promise<UpcomingEvent[]> {
  // If user id provided, filter events based on the user's current track and module
  if (userId) {
    const userNextTrackAndModule = await getUserNextTrackAndModule({
      userId: userId,
      completionThreshold: 0.7,
    });

    if (userNextTrackAndModule) {
      const { data, error } = await supabase
        .from("lessons_events")
        .select(
          `
        lessons!inner (
          church_lessons!inner (
            series!inner (
              track_id,
              series_number
            )
          )
        ),
        events!inner (*)
        `,
        )
        .eq(
          "lessons.church_lessons.series.track_id",
          userNextTrackAndModule?.track,
        )
        .eq(
          "lessons.church_lessons.series.series_number",
          userNextTrackAndModule?.module,
        )
        .gte("event_type_id", 3);
    }
  }

  // Get all events TODO: Replace this with getting only sermons and devotions events
  let query = supabase
    .from("events")
    .select(
      `
    id,
    title,
    information,
    timestamp_start,
    timestamp_end,
    location,
    is_online,
    repeat_every_days,
    event_type_id,
    life_group_id
  `,
    )
    .or("location.not.is.null,is_online.eq.true")
    .neq("event_type_id", 3)
    .neq("event_type_id", 4)
    .neq("event_type_id", 5)
    .gte("timestamp_start", new Date().toISOString());

  // Keep all non-life-group events, but only show life-group events
  // belonging to the user's life group.
  if (lifeGroupId) {
    query = query.or(`life_group_id.is.null,life_group_id.eq.${lifeGroupId}`);
  }

  const { data, error } = await query;

  console.log("events data", data); // TESTING

  if (error) {
    console.log("Upcoming events not found", error);
    return [];
  }

  return (data ?? []).map((event) => {
    const timestampStart = event.timestamp_start
      ? new Date(event.timestamp_start)
      : new Date();

    return {
      id: event.id,
      title: event.title ?? "",
      information: event.information ?? "",
      timestamp_start: timestampStart,
      timestamp_end: event.timestamp_end
        ? new Date(event.timestamp_end)
        : timestampStart,
      location: event.location ?? "",
      is_online: event.is_online ?? false,
      repeatEveryDays: event.repeat_every_days ?? null,
      eventTypeId: event.event_type_id,
      lifeGroupId: event.life_group_id,
    };
  });
}
