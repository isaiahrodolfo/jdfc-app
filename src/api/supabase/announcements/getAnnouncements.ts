import { supabase } from "@/lib/supabase";
import type { Database } from "../../../../database.types";

// Define explicit TypeScript types extracted from the Supabase Schema
export type Announcement = Pick<
  Database["public"]["Tables"]["announcements"]["Row"],
  "name" | "category" | "announcement_end" | "color" // only include the fields we need for announcements
>;

/**
 * Gets all announcements that are not expired
 *
 * @export
 * @async
 * @returns {Promise<Announcement[]>}
 */
export async function getAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from("announcements")
    .select("name, category, announcement_end, color");

  if (error || !data) {
    console.log("Announcements not found");
    return [];
  }

  return data;
}
