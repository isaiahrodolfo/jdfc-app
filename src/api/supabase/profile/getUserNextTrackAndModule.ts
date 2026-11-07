import { supabase } from "@/lib/supabase";

/**
 * Gets the highest track and module that the given user can access.
 * A module is complete when the user's completion ratio meets the threshold.
 *
 * @export
 * @param {{
 *   userId: string;
 *   completionThreshold: number;
 * }} param0
 * @param {string} param0.userId - The user id
 * @param {number} param0.completionThreshold - Represents a percentage from 0 to 1
 * - The threshold for module completion: the user has completed the module
 *  if the ratio of completed number of lessons to all lessons in
 *  that module is at least completionThreshold
 * @returns {({ track: number; module: number } | null)}
 */
export default async function getUserNextTrackAndModule({
  userId,
  completionThreshold,
}: {
  userId: string;
  completionThreshold: number;
}): Promise<{ track: number; module: number } | null> {
  if (
    !Number.isFinite(completionThreshold) ||
    completionThreshold < 0 ||
    completionThreshold > 1
  ) {
    throw new RangeError("completionThreshold must be between 0 and 1.");
  }

  const { data: lessons, error } = await supabase.from("church_lessons").select(
    `
        lessons!inner (
          id,
          is_user_completable,
          users_lessons_completions!left (
            user_id,
            is_completed
          )
        ),
        series!inner (
          track_id,
          series_number
        )
      `,
  );

  if (error) {
    throw error;
  }

  const modules = new Map<
    string,
    {
      track: number;
      module: number;
      totalLessons: number;
      completedLessons: number;
    }
  >();

  for (const row of lessons) {
    const trackId = row.series.track_id;
    if (trackId < 3) {
      continue;
    }

    const moduleNumber = row.series.series_number ?? (trackId === 3 ? 1 : null);
    if (moduleNumber === null) {
      continue;
    }

    const key = `${trackId}:${moduleNumber}`;
    const module = modules.get(key) ?? {
      track: trackId,
      module: moduleNumber,
      totalLessons: 0,
      completedLessons: 0,
    };

    module.totalLessons += 1;
    if (
      row.lessons.users_lessons_completions?.some(
        (completion) =>
          completion.user_id === userId && completion.is_completed === true,
      )
    ) {
      module.completedLessons += 1;
    }

    modules.set(key, module);
  }

  const orderedModules = [...modules.values()].sort(
    (a, b) => a.track - b.track || a.module - b.module,
  );

  if (orderedModules.length === 0) {
    return null;
  }

  for (let index = 0; index < orderedModules.length; index += 1) {
    const currentModule = orderedModules[index];
    const completion =
      currentModule.completedLessons / currentModule.totalLessons;

    if (completion < completionThreshold) {
      return {
        track: currentModule.track,
        module: currentModule.module,
      };
    }

    const nextModule = orderedModules[index + 1];
    if (nextModule) {
      continue;
    }

    const { data: nextTrack, error: nextTrackError } = await supabase
      .from("tracks")
      .select("id")
      .gt("id", currentModule.track)
      .order("id")
      .limit(1)
      .maybeSingle();

    if (nextTrackError) {
      throw nextTrackError;
    }

    return nextTrack ? { track: nextTrack.id, module: 1 } : null;
  }

  return null;
}
