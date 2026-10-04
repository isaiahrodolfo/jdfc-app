import { supabase } from "@/lib/supabase";

export default async function getCompletion(lessonId: number, userId: string) {
  const { data: userLesson, error: userLessonError } = await supabase
    .from("users_lessons_completions")
    .select("is_completed")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (userLessonError) {
    throw userLessonError;
  }

  // console.log("user lesson completion:", userLesson?.is_completed);

  return userLesson?.is_completed ?? false;
}
