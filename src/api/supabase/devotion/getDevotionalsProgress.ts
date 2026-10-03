import type { CheckboxData } from "@/components/progress_tracker/CheckboxesContainer";
import { supabase } from "@/lib/supabase";

export default async function getDevotionalsProgress(): Promise<
  CheckboxData[]
> {

    const { data, error } = await supabase
      .from("")
      .select(
        `
        `
      )
    `,
      )
      .eq("lessons_events.lessons_events_link.is_live", true);

  return [];
}

// write the getDevotionalsProgress function, getting from users_lessons_completed, where the lessons are from the last two weeks, and whose lesson_ids are also found in devotion_lessons