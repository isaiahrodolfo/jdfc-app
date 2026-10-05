import { supabase } from "@/lib/supabase";
import { Json } from "../../../../database.types";

export type EducationTrack = {
  trackName: string;
  heading: string;
  seriesLessons: SeriesLessons[];
};

export type SeriesLessons = {
  seriesId: number;
  seriesNumber: number | null;
  lessons: EducationLesson[];
};

export type EducationLesson = {
  churchLessonId: number;
  lessonId: number;
  lessonNumber: number | null;
  title: string | null;
  tags: Json;
  timestamp?: string | null;
  speakers?: string[];
};

/**
 * Gets all education lessons for a track, categorized by series.
 *
 * @param trackId The ID of the education track.
 * @returns All lessons for the track grouped by series.
 */
export async function getEducationLessons(
  trackId: number,
): Promise<EducationTrack> {
  const { data, error } = await supabase
    .from("church_lessons")
    .select(
      `
        id,
        lesson_number,
        series (
          id,
          name,
          series_number,
          created_at,
          tracks (
            id,
            name,
            heading
          )
        ),
        lessons (
          id,
          title,
          tags,
          lessons_events (
            id,
            events (
              id,
              title,
              timestamp,
              location
            ),
            lessons_events_speakers (
              user_id
            )
          )
        )
      `,
    )
    .eq("series.tracks.id", trackId);

  if (error) {
    throw error;
  }

  /*
   * Find the track from the first row that has a matching series/track.
   *
   * The nested relationships are optional, so series/tracks may be null.
   */
  const track = data.find((item) => item.series?.tracks?.id === trackId)?.series
    ?.tracks;

  if (!track) {
    return {
      trackName: "",
      heading: "",
      seriesLessons: [],
    };
  }

  /*
   * Keep createdAt internally so unnumbered series can be sorted
   * newest → oldest. It is removed before returning the result.
   */
  const seriesMap = new Map<number, SeriesLessons & { createdAt: string }>();

  for (const item of data) {
    if (!item.series || !item.lessons) {
      continue;
    }

    const seriesId = item.series.id;

    if (!seriesMap.has(seriesId)) {
      seriesMap.set(seriesId, {
        seriesId,
        seriesNumber: item.series.series_number,
        createdAt: item.series.created_at,
        lessons: [],
      });
    }

    const series = seriesMap.get(seriesId);

    if (!series) {
      continue;
    }

    /*
     * A lesson may not have any lessons_events.
     *
     * If it does not, lessonsEvents[0] is undefined, so every
     * property accessed from it must use optional chaining.
     */
    const lessonEvent = item.lessons.lessons_events?.[0];

    series.lessons.push({
      churchLessonId: item.id,
      lessonId: item.lessons.id,
      lessonNumber: item.lesson_number,
      title: item.lessons.title,
      tags: item.lessons.tags,

      // No event = no timestamp.
      timestamp: lessonEvent?.events?.timestamp ?? null,

      // No event/speakers = empty speaker list.
      speakers:
        lessonEvent?.lessons_events_speakers
          ?.map((speaker) => speaker.user_id)
          .filter((id): id is string => id !== null) ?? [],
    });
  }

  /*
   * Sort series:
   *
   * 1. Numbered series first.
   * 2. Numbered series ascending.
   * 3. Unnumbered series afterward.
   * 4. Unnumbered series newest → oldest.
   */
  const seriesLessons = Array.from(seriesMap.values())
    .sort((a, b) => {
      if (a.seriesNumber !== null && b.seriesNumber !== null) {
        return a.seriesNumber - b.seriesNumber;
      }

      if (a.seriesNumber !== null) {
        return -1;
      }

      if (b.seriesNumber !== null) {
        return 1;
      }

      return b.createdAt.localeCompare(a.createdAt);
    })
    .map(({ createdAt, ...series }) => series);

  return {
    trackName: track.name ?? "",
    heading: track.heading ?? "",
    seriesLessons,
  };
}
