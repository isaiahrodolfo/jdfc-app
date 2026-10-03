import type { CheckboxData } from "@/components/progress_tracker/CheckboxesContainer";
import { supabase } from "@/lib/supabase";

export default async function getDevotionalsProgress(): Promise<
  CheckboxData[]
> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error(
      "Cannot get devotional progress without an authenticated user.",
    );
  }

  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 13);
  const startDateKey = `${startDate.getFullYear()}-${String(
    startDate.getMonth() + 1,
  ).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;

  const { data: devotionals, error: devotionalsError } = await supabase
    .from("devotion_lessons")
    .select("lesson_id, date")
    .gte("date", startDateKey)
    .lte("date", todayKey)
    .not("lesson_id", "is", null)
    .order("date", { ascending: true });

  if (devotionalsError) {
    throw devotionalsError;
  }

  if (!devotionals.length) {
    return [];
  }

  const lessonIds = devotionals.flatMap((devotional) =>
    devotional.lesson_id === null ? [] : [devotional.lesson_id],
  );

  const { data: completions, error: completionsError } = await supabase
    .from("users_lessons_completions")
    .select("lesson_id, is_completed")
    .eq("user_id", user.id)
    .in("lesson_id", lessonIds);

  if (completionsError) {
    throw completionsError;
  }

  const completedByLessonId = new Map(
    completions.map((completion) => [
      completion.lesson_id,
      completion.is_completed === true,
    ]),
  );

  return devotionals.map((devotional) => {
    const [year, month, day] = devotional.date.split("-").map(Number);
    const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(
      day,
    ).padStart(2, "0")}`;

    return {
      date: day,
      isChecked:
        devotional.lesson_id === null
          ? false
          : (completedByLessonId.get(devotional.lesson_id) ?? false),
      isCurrent: dateKey === todayKey,
    };
  });
}
