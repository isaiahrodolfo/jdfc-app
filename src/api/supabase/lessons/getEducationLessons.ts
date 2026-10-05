import { supabase } from "@/lib/supabase";
import { Json } from "../../../../database.types";

export type EducationTrack = {
  trackName: string;
  heading: string;
  seriesLessons: SeriesLessons[];
};

export type SeriesLessons = {
  name: string | null;
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
  isCompleted?: boolean;
};

/**
 * Gets all education lessons for a track, categorized by series.
 *
 * @param trackId The ID of the education track.
 * @param userId Optional user ID used to retrieve that user's completion status.
 * @returns All lessons for the track grouped by series.
 */
export async function getEducationLessons(
  trackId: number,
  userId?: string,
): Promise<EducationTrack> {
  let query = supabase
    .from("church_lessons")
    .select(
      `
        id,
        lesson_number,
        series!inner (
          id,
          name,
          series_number,
          created_at,
          tracks!inner (
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
          ),
          users_lessons_completions!left (
            user_id,
            is_completed
          )
        )
      `,
    )
    .eq("series.tracks.id", trackId);

  // Only filter the embedded completion rows when a user ID was provided.
  if (userId) {
    query = query.eq("lessons.users_lessons_completions.user_id", userId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  const track = data.find((item) => item.series?.tracks?.id === trackId)?.series
    ?.tracks;

  if (!track) {
    return {
      trackName: "",
      heading: "",
      seriesLessons: [],
    };
  }

  const seriesMap = new Map<number, SeriesLessons & { createdAt: string }>();

  for (const item of data) {
    if (!item.series || !item.lessons) {
      continue;
    }

    const seriesId = item.series.id;

    if (!seriesMap.has(seriesId)) {
      seriesMap.set(seriesId, {
        name: item.series.name,
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

    const lessonEvent = item.lessons.lessons_events?.[0];

    const completion = item.lessons.users_lessons_completions?.[0];

    series.lessons.push({
      churchLessonId: item.id,
      lessonId: item.lessons.id,
      lessonNumber: item.lesson_number,
      title: item.lessons.title,
      tags: item.lessons.tags,
      timestamp: lessonEvent?.events?.timestamp ?? null,
      speakers:
        lessonEvent?.lessons_events_speakers
          ?.map((speaker) => speaker.user_id)
          .filter((id): id is string => id !== null) ?? [],
      isCompleted: completion?.is_completed ?? false,
    });
  }

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
