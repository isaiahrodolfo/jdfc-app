import { supabase } from "@/lib/supabase";

type UpsertEventProps = {
  eventId?: number;
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
  title,
  timestamp,
  location,
  information,
  announcementStart,
  announcementEnd,
  lifeGroupId,
  isOnline,
}: UpsertEventProps) {
  const { data, error } = await supabase.from("events").upsert({
    id: eventId,
    title: title,
    timestamp: timestamp.toISOString(),
    location: location,
    information: information,
    announcement_start: announcementStart.toISOString(),
    announcement_end: announcementEnd.toISOString(),
    life_group_id: lifeGroupId,
    is_online: isOnline,
  });
}
