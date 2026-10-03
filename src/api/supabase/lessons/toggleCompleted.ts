import { supabase } from "@/lib/supabase";

export async function toggleCompleted(
  userId: string,
  lessonId: number,
  toggleTo: boolean,
) {
  console.log("toggleCompleted() was triggered with", {
    userId,
    lessonId,
  });

  try {
    const { error } = await supabase
      .from("users_lessons_completions")
      .upsert(
        {
          user_id: userId,
          lesson_id: lessonId,
          is_completed: toggleTo,
        },
        {
          onConflict: "user_id,lesson_id",
        },
      )
      .select()
      .single();
  } catch (error) {
    console.error("Error toggling completed:", error);
  }
}
