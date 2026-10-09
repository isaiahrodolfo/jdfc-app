import { supabase } from "@/lib/supabase";

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

export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  const { data, error } = await supabase
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
    .gte("timestamp_start", new Date().toISOString());

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
