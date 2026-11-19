import { supabase } from "@/lib/supabase";

export async function getFamilyAdminStatus(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("profiles")
    .select("is_family_admin")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data.is_family_admin ?? false;
}
