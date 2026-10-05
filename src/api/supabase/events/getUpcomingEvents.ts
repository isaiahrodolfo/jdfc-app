import { supabase } from "@/lib/supabase";

export type UpcomingEvent = {
  title: string;
  information: string;
  date: Date;
  location: string;
  repeatEveryDays: number | null;
};

export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  const { data, error } = await supabase
    .from("events")
    .select(
      `
      title,
      information,
      timestamp,
      location,
      repeat_every_days,
      lessons_events!inner (
        lessons!inner (
          is_user_completable
        )
      )
    `,
    )
    .eq("lessons_events.lessons.is_user_completable", false)
    .gte("timestamp", new Date().toISOString());

  if (error) {
    console.log("Upcoming events not found", error);
    return [];
  }
  console.log(
    data.map((event) => event.lessons_events[0].lessons.is_user_completable),
  );

  return (data ?? []).map((event) => ({
    title: event.title ?? "",
    information: event.information ?? "",
    date: event.timestamp ? new Date(event.timestamp) : new Date(),
    location: event.location ?? "",
    repeatEveryDays: event.repeat_every_days ?? null,
  }));
}
