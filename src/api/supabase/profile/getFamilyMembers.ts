import { supabase } from "@/lib/supabase";
import { Database } from "../../../../database.types";

// Define explicit TypeScript types extracted from the Supabase Schema
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

/**
 * Gets the family members of the user.
 *
 * @export
 * @async
 * @returns {Promise<Profile | null>[]}
 */
export async function getFamilyMembers(
  userId: string,
): Promise<Profile[] | null> {
  // First get the user's family_id
  const { data: userProfile, error: profileError } = await supabase
    .from("profiles")
    .select("family_id")
    .eq("id", userId)
    .single();

  if (profileError) {
    throw profileError;
  }

  if (!userProfile?.family_id) {
    return null;
  }

  // Get all profiles belonging to that family
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("family_id", userProfile.family_id);

  if (error) {
    throw error;
  }

  return data;
}
