import { supabase } from "@/lib/supabase";
import { Database } from "../../../../database.types";

// Define explicit TypeScript types extracted from the Supabase Schema
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

/**
 * Gets all series by track id
 *
 * @export
 * @async
 * @returns {Promise<Profile[]>}
 */
export async function getLifeGroupMembers(
  lifeGroupId: number,
): Promise<Profile[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("life_group_id", lifeGroupId);

  if (error || !data) {
    console.log(`Profiles not found for life group id ${lifeGroupId}`, error);
    return [];
  }

  return data;
}
