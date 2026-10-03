import { Devotional } from "@/api/supabase/our_daily_bread/odb_api";
import { router } from "expo-router";

export const handleDevotionalPress = (devotional: Devotional) => {
  // Navigate to a detailed view
  router.push({
    pathname: "/devotional/[link]",
    params: {
      link: devotional.odbUrl,
      title: devotional.title,
      dateKey: devotional.dateKey,
    },
  });
};
