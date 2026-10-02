import { useAuthContext } from "@/hooks/use-auth-context";
import { supabase } from "@/lib/supabase";
import { findDevotional } from "./findDevotional";

export default async function upsertDevotional(
  uniqueIdentifier: string,
  title: string,
  date: string,
  text: string,
) {
  const { user } = useAuthContext();
  // Find the devotional's link
  try {
    const devotional = await findDevotional(uniqueIdentifier, title, date);

    if (!devotional.lesson_id) {
      console.error("Devotional has no lesson ID");
      return;
    }

    try {
      const { error } = await supabase
        .from("users_lessons")
        .upsert(
          {
            user_id: user.id,
            lesson_id: devotional.lesson_id,
            notes: text,
          },
          {
            onConflict: "user_id,lesson_id",
          },
        )
        .select()
        .single();
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  } catch (error) {
    console.error("Error finding devotional:", error);
  }
}
