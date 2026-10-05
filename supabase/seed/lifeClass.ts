import type { createSeedClient } from "@snaplet/seed";

/**
 * Seed Life Class Lessons and Events
 *
 * @export
 * @async
 * @param {Awaited<ReturnType<typeof createSeedClient>>} seed
 * @returns {*}
 */
export async function seedLifeClass(
  seed: Awaited<ReturnType<typeof createSeedClient>>,
  speakerId: string,
) {
  await seed.series([
    // Series 1
    {
      id: 401,
      series_number: 1,
      name: "Learning From Our Mistakes",
      track_id: 4,
    },
    // Series 2
    {
      id: 402,
      series_number: 2,
      name: "The Best Deal Of Your Life",
      track_id: 4,
    },
  ]);
  await seed.lessons([
    // Day 1
    {
      title: "A New Day",
      church_lessons: [
        {
          lesson_number: 1,
          series_id: 401,
        },
      ],
    },
    // Day 2
    {
      title: "An Opportunity For An Encounter",
      church_lessons: [
        {
          lesson_number: 2,
          series_id: 401,
        },
      ],
    },
    // Week 1 Recap
    {
      title: "The Best Deal Of Your Life (Recap)",
      church_lessons: [
        {
          lesson_number: 8,
          series_id: 401,
        },
      ],
      lessons_events: [
        {
          lessons_events_speakers: [
            {
              user_id: speakerId,
            },
          ],
        },
      ],
    },
    // Day 8
    {
      title: "The Best Deal Of Your Life",
      church_lessons: [
        {
          lesson_number: 1,
          series_id: 402,
        },
      ],
    },
  ]);
}
