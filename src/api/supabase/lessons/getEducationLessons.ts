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
 * Gets all education lessons for a track, categorized by series
 *
 * @export
 * @async
 * @returns {Promise<EducationTrack>}
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

  data.forEach((item) => {
    if (!item.series || !item.lessons) {
      return;
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

    seriesMap.get(seriesId)!.lessons.push({
      churchLessonId: item.id,
      lessonId: item.lessons.id,
      lessonNumber: item.lesson_number,
      title: item.lessons.title,
      tags: item.lessons.tags,
      timestamp: item.lessons.lessons_events[0].events?.timestamp ?? "",
      speakers:
        item.lessons.lessons_events[0]?.lessons_events_speakers
          ?.map((speaker) => speaker.user_id)
          .filter((id): id is string => id !== null) ?? [],
    });
  });

  const seriesLessons = Array.from(seriesMap.values())
    .sort((a, b) => {
      // Numbered series first, ascending
      if (a.seriesNumber !== null && b.seriesNumber !== null) {
        return a.seriesNumber - b.seriesNumber;
      }

      // Numbered series before unnumbered
      if (a.seriesNumber !== null) {
        return -1;
      }

      if (b.seriesNumber !== null) {
        return 1;
      }

      // Both unnumbered: newest first
      return b.createdAt.localeCompare(a.createdAt);
    })
    .map(({ createdAt, ...series }) => series);

  console.log(track.name, track.heading, seriesLessons);

  return {
    trackName: track.name ?? "",
    heading: track.heading ?? "",
    seriesLessons,
  };
}
