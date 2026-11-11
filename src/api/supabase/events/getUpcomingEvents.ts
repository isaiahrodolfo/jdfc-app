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
  let educationEvents: UpcomingEvent[] = [];

  console.log("userId for this function:", userId);

  // If user id provided, filter education events based on
  // the user's current track and module.
  if (userId) {
    const userNextTrackAndModule = await getUserNextTrackAndModule({
      userId,
      completionThreshold: 0.7,
    });

    console.log("userNextTrackAndModule:", userNextTrackAndModule);

    if (userNextTrackAndModule) {
      const { track, module } = userNextTrackAndModule;

      console.log("Filtering education events by:", {
        track,
        module,
      });

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
          events!inner (
            *
          )
          `,
        )
        .eq("lessons.church_lessons.series.track_id", track)
        .eq("lessons.church_lessons.series.series_number", module)
        .gte("events.event_type_id", 3);

      if (error) {
        console.error("Error getting education events:", error);
      } else {
        console.log(
          "Education events for this user:",
          JSON.stringify(data, null, 2),
        );

        educationEvents = (data ?? []).map(({ events: event }) => {
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
    } else {
      console.log("User does not have a next track or module");
    }
  } else {
    console.log("No user id provided");
  }

  // Get only sermons, devotions, and life group events here
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

  console.log("events data:", data);

  if (error) {
    console.error("Upcoming events not found:", error);
    return educationEvents;
  }

  const events: UpcomingEvent[] = [
    ...educationEvents,
    ...(data ?? []).map((event) => {
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
    }),
  ];

  return events;
}
