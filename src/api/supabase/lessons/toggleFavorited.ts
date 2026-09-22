import { supabase } from "@/lib/supabase";

export async function toggleFavorited(
  userId: string,
  lessonId: number,
  toggleTo: boolean,
) {
  console.log("toggleFavorited() was triggered with", {
    userId,
    lessonId,
  });

  try {
    const { error } = await supabase
      .from("users_lessons")
      .upsert(
        {
          user_id: userId,
          lesson_id: lessonId,
          is_favorited: toggleTo,
        },
        {
          onConflict: "user_id,lesson_id",
        },
      )
      .select()
      .single();
  } catch (error) {
    console.error("Error toggling favorited:", error);
  }
}
