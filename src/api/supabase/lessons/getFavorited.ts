import { supabase } from "@/lib/supabase";

export async function toggleFavorited(
  userId: string,
  lessonId: number,
): Promise<boolean> {
  const { data, error } = await supabase
    .from("users_lessons")
    .select("is_favorited")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .single();

  if (error) throw error;

  return data.is_favorited;
}
