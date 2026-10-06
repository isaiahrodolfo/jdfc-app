import { supabase } from "@/lib/supabase";

export async function toggleCompleted(
  userId: string,
  lessonId: number,
  toggleTo: boolean,
) {
  const { error } = await supabase.from("users_lessons_completions").upsert(
    {
      user_id: userId,
      lesson_id: lessonId,
      is_completed: toggleTo,
    },
    {
      onConflict: "user_id,lesson_id",
    },
  );

  if (error) {
    throw error;
  }
}
