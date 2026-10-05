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
    // Day 1 — October 19, 2026
    {
      title: "A New Day",
      church_lessons: [
        {
          lesson_number: 1,
          series_id: 401,
        },
      ],
      lessons_events: [
        {
          events: {
            // Today (testing)
            timestamp: new Date("2026-10-04T13:00:00-07:00"),
          },
        },
      ],
    },

    // Day 2 — October 20, 2026
    {
      title: "An Opportunity For An Encounter",
      church_lessons: [
        {
          lesson_number: 2,
          series_id: 401,
        },
      ],
      lessons_events: [
        {
          events: {
            // October 20, 2026 at 1:00 PM Pacific
            timestamp: new Date("2026-10-20T13:00:00-07:00"),
          },
        },
      ],
    },

    // Week 1 Recap — October 25, 2026
    {
      title: "Learning From Our Mistakes (Recap)",
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
          events: {
            // October 25, 2026 at 1:00 PM Pacific
            timestamp: new Date("2026-10-25T13:00:00-07:00"),
            location: "Jesus' Disciples Family Church",
          },
        },
      ],
    },

    // Day 8 — October 26, 2026
    {
      title: "The Best Deal Of Your Life",
      church_lessons: [
        {
          lesson_number: 1,
          series_id: 402,
        },
      ],
      lessons_events: [
        {
          events: {
            // October 26, 2026 at 1:00 PM Pacific
            timestamp: new Date("2026-10-26T13:00:00-07:00"),
          },
        },
      ],
    },

    // Week 2 Recap — November 1, 2026
    {
      title: "The Best Deal Of Your Life (Recap)",
      church_lessons: [
        {
          lesson_number: 8,
          series_id: 402,
        },
      ],
      lessons_events: [
        {
          lessons_events_speakers: [
            {
              user_id: speakerId,
            },
          ],
          events: {
            // November 1, 2026 at 1:00 PM Pacific
            timestamp: new Date("2026-11-01T13:00:00-07:00"),
            location: "Jesus' Disciples Family Church",
            information:
              "Life Class Module 1 Week 1 Recap: Learning From Our Mistakes",
          },
        },
      ],
    },
  ]);
}
