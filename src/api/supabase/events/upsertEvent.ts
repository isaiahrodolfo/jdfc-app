import { supabase } from "@/lib/supabase";

type UpsertEventProps = {
  eventId: number | null;
  eventTypeId: number;
  title: string;
  timestamp: Date;
  location: string;
  information: string;
  announcementStart: Date;
  announcementEnd: Date;
  lifeGroupId: number | null;
  isOnline: boolean;
};

export default async function upsertEvent({
  eventId,
  eventTypeId,
  title,
  timestamp,
  location,
  information,
  announcementStart,
  announcementEnd,
  lifeGroupId,
  isOnline,
}: UpsertEventProps): Promise<number | null> {
  let query = supabase.from("events").upsert({
    event_type_id: eventTypeId,
    title,
    timestamp: timestamp.toISOString(),
    location,
    information,
    announcement_start: announcementStart.toISOString(),
    announcement_end: announcementEnd.toISOString(),
    life_group_id: lifeGroupId,
    is_online: isOnline,
  });

  if (eventId) {
    query = query.eq("id", eventId);
  }

  const { data, error } = await query.select("id").single();

  if (error) {
    console.error("Error upserting event:", error);
    return null;
  }

  return data.id;
}
