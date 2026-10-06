import { supabase } from "@/lib/supabase";
import { Database } from "../../../../database.types";

// Define explicit TypeScript types extracted from the Supabase Schema
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

/**
 * Gets the user's profile
 *
 * @export
 * @async
 * @returns {Promise<Profile | null>}
 */
export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.log("Profile not found", error);
    return null;
  }

  return data;
}
