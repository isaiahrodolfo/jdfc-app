import { Devotional } from "@/api/supabase/our_daily_bread/odb_api";
import { router } from "expo-router";

type DevotionalWithLessonId = Devotional & { lessonId: number };

export const handleDevotionalPress = (
  devotional: DevotionalWithLessonId,
) => {
  // Navigate to a detailed view
  router.push({
    pathname: "/devotional/[link]",
    params: {
      link: devotional.odbUrl,
      title: devotional.title,
      dateKey: devotional.dateKey,
      lessonId: devotional.lessonId,
    },
  });
};
