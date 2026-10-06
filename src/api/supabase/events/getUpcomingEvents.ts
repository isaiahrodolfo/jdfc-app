import { supabase } from "@/lib/supabase";

export type UpcomingEvent = {
  id: number;
  title: string;
  information: string;
  date: Date;
  location: string;
  repeatEveryDays: number | null;
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
      timestamp,
      location,
      repeat_every_days,
      life_group_id
    `,
    )
    .not("location", "is", null)
    .gte("timestamp", new Date().toISOString());

  if (error) {
    console.log("Upcoming events not found", error);
    return [];
  }

  return (data ?? []).map((event) => {
    return {
      id: event.id,
      title: event.title ?? "",
      information: event.information ?? "",
      date: event.timestamp ? new Date(event.timestamp) : new Date(),
      location: event.location ?? "",
      repeatEveryDays: event.repeat_every_days ?? null,
      lifeGroupId: event.life_group_id,
    };
  });
}
