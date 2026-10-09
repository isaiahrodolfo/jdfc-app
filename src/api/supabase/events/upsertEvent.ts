import { supabase } from "@/lib/supabase";

type UpsertEventProps = {
  eventId: number | null;
  eventTypeId: number;
  title: string;
  timestampStart: Date;
  timestampEnd: Date;
  location: string;
  information: string;
  announcementStart: Date;
  lifeGroupId: number | null;
  isOnline: boolean;
};

export default async function upsertEvent({
  eventId,
  eventTypeId,
  title,
  timestampStart,
  timestampEnd,
  location,
  information,
  announcementStart,
  lifeGroupId,
  isOnline,
}: UpsertEventProps): Promise<number | null> {
  let query = supabase.from("events").upsert({
    event_type_id: eventTypeId,
    title,
    timestamp_start: timestampStart.toISOString(),
    timestamp_end: timestampEnd.toISOString(),
    location,
    information,
    announcement_start: announcementStart.toISOString(),
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
