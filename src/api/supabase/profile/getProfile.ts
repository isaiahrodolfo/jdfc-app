import { supabase } from "@/lib/supabase";
import { Database } from "../../../../database.types";

// Define explicit TypeScript types extracted from the Supabase Schema
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

/**
 * Gets today's devotional
 *
 * @export
 * @async
 * @returns {Promise<Profile[]>}
 */
export async function getProfile(userId: string): Promise<Profile[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId);

  if (error) throw Error;

  return data;
}
