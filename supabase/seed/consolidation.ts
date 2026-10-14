import type { createSeedClient } from "@snaplet/seed";
import { getPacificSundayTimestamp } from "./eventDuration";
const lessonTitles = [
  "Salvation",
  "Repentance",
  "Lordship",
  "Forgiveness",
  "The 4 Greatest Meetings",
  "Devotional Life",
  "Your Active Life Of Prayer",
  "Witnessing",
  "Life Of Obedience",
  "Life In The Church",
];

export async function seedConsolidation(
  seed: Awaited<ReturnType<typeof createSeedClient>>,
  speakerId: string,
) {
  const seriesId = 301;
  await seed.series([
    {
      id: seriesId,
      name: "Consolidation",
      series_number: null,
      track_id: 3,
    },
  ]);

  await seed.lessons(
    lessonTitles.map((title, index) => {
      const timestampStart = getPacificSundayTimestamp(index);
      const timestampEnd = new Date(timestampStart.getTime() + 60 * 60 * 1000);

      return {
        title,
        is_user_completable: false,
        church_lessons: [{ lesson_number: index + 1, series_id: seriesId }],
        lessons_events: [
          {
            events: {
              title: "Consolidation",
              timestamp_start: timestampStart,
              timestamp_end: timestampEnd,
              location: "Jesus' Disciples Family Church",
              event_type_id: 3,
            },
            lessons_events_speakers: [{ user_id: speakerId }],
          },
        ],
      };
    }),
  );
}
