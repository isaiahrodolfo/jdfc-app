import type { CheckboxData } from "@/components/progress_tracker/CheckboxesContainer";
import { getDevotionalsProgressStartDate } from "@/components/helpers/getDevotionalsProgressStartDate";
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
  const startDate = getDevotionalsProgressStartDate(today);
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

  const lessonIds = devotionals.flatMap((devotional) =>
    devotional.lesson_id === null ? [] : [devotional.lesson_id],
  );

  const { data: completions, error: completionsError } = lessonIds.length
    ? await supabase
        .from("users_lessons_completions")
        .select("lesson_id, is_completed")
        .eq("user_id", user.id)
        .in("lesson_id", lessonIds)
    : { data: [], error: null };

  if (completionsError) {
    throw completionsError;
  }

  const completedByLessonId = new Map(
    completions.map((completion) => [
      completion.lesson_id,
      completion.is_completed === true,
    ]),
  );

  const devotionalsByDate = new Map(
    devotionals.map((devotional) => [devotional.date, devotional]),
  );
  const progress: CheckboxData[] = [];

  for (
    const date = new Date(startDate);
    date <= today;
    date.setDate(date.getDate() + 1)
  ) {
    const dateKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const devotional = devotionalsByDate.get(dateKey);

    progress.push({
      date: date.getDate(),
      dateKey,
      isChecked:
        devotional?.lesson_id == null
          ? false
          : (completedByLessonId.get(devotional.lesson_id) ?? false),
      isCurrent: dateKey === todayKey,
    });
  }

  return progress;
}
