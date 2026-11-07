import { supabase } from "@/lib/supabase";

export type ProfileSearchResult = {
  userId: string;
  name: string;
};

/**
 * Gets all profile names that match the search query.
 * Filter out profiles without names.
 *
 * @export
 * @async
 * @param {string} nameQuery - The name or name fragment
 * @returns {Promise<ProfileSearchResult[]>}
 */
export async function getProfileNames(
  nameQuery: string,
): Promise<ProfileSearchResult[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name")
    .ilike("full_name", `%${nameQuery}%`)
    .not("full_name", "is", null);

  if (error) throw error;

  return (data ?? []).map((profile) => ({
    userId: profile.id,
    name: profile.full_name!,
  }));
}
