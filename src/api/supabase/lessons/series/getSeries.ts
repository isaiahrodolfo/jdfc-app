import { supabase } from "@/lib/supabase";
import { Database } from "../../../../../database.types";

// Define explicit TypeScript types extracted from the Supabase Schema
export type Series = Database["public"]["Tables"]["series"]["Row"];

/**
 * Gets all series by track id
 *
 * @export
 * @async
 * @returns {Promise<Series[]>}
 */
export async function getSeries(trackId: number): Promise<Series[]> {
  const { data, error } = await supabase
    .from("series")
    .select()
    .eq("track_id", trackId);

  if (error || !data) {
    console.log("Series not found", error);
    return [];
  }

  return data;
}
