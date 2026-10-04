import type { createSeedClient } from "@snaplet/seed";

export async function seedSermonsEventLessons(
  seed: Awaited<ReturnType<typeof createSeedClient>>,
) {
  // Seeding sample Sunday and Prayer Service Series
  await seed.series([
    {
      id: 67,
      name: "Sunday Service Sermon Series 1",
      series_number: null,
      track_id: 1,
    },
    {
      id: 68,
      name: "Sunday Service Sermon Series 2",
      series_number: null,
      track_id: 1,
    },
    {
      id: 124,
      name: "Prayer Service Sermon Series 1",
      series_number: null,
      track_id: 2,
    },
    {
      id: 125,
      name: "Prayer Service Sermon Series 2",
      series_number: null,
      track_id: 2,
    },
  ]);

  // Seeding a (live) Sunday Service
  await seed.lessons([
    {
      id: 1,
      title: "Sunday Sermon Title",
    },
  ]);

  await seed.events([
    {
      id: 1,
      title: "Sunday Service",
      timestamp: new Date("2026-10-25T10:00:00-07:00"), // October 25, 2026 10:00 am Local Time
      location: "Jesus' Disciples Family Church",
      information: "Weekly church service",
    },
  ]);

  await seed.church_lessons([
    {
      id: 1,
      series_id: 67,
      lesson_number: 1,
      lesson_id: 1,
    },
  ]);

  await seed.lessons_events([
    {
      id: 1,
      lesson_id: 1,
      event_id: 1,
    },
  ]);

  // Seeding an upcoming Prayer Service
  await seed.lessons([
    {
      id: 2,
      title: "Prayer Service Sermon Title",
    },
  ]);

  await seed.events([
    {
      id: 2,
      title: "Prayer Service",
      timestamp: new Date("2026-10-28T19:00:00-07:00"), // October 28, 2026 7:00 pm Local Time
      location: "Jesus' Disciples Family Church",
      information: "Weekly prayer service",
      repeat_every_days: 7,
    },
  ]);

  await seed.church_lessons([
    {
      id: 2,
      series_id: 124,
      lesson_number: 1,
      lesson_id: 2,
    },
  ]);

  await seed.lessons_events([
    {
      id: 2,
      lesson_id: 2,
      event_id: 2,
    },
  ]);

  // Seeding a previous Sunday and Prayer Service (Event and Lesson)
  // Testing getrecentLiveEventLessons. Should return lessons 3 & 4, not 5
  await seed.events([
    {
      id: 3,
      title: "Sunday Service",
      timestamp: new Date("2026-09-27T10:00:00-07:00"), // September 27, 2026 10:00 am Local Time
      location: "Jesus' Disciples Family Church",
      information: "Weekly church service",
    },
    {
      id: 4,
      title: "Prayer Service",
      timestamp: new Date("2026-09-30T19:00:00-07:00"), // September 30, 2026 7:00 pm Local Time
      location: "Jesus' Disciples Family Church",
      information: "Weekly prayer service",
    },
    {
      id: 5,
      title: "Prayer Service",
      timestamp: new Date("2026-09-02T19:00:00-07:00"), // September 2, 2026 7:00 pm Local Time
      location: "Jesus' Disciples Family Church",
      information: "Weekly prayer service",
    },
  ]);

  await seed.lessons([
    {
      id: 3,
      title: "Previous Sermon Service Sermon Title",
    },
    {
      id: 4,
      title: "Previous Prayer Service Sermon Title",
    },
    {
      id: 5,
      title: "Old Prayer Service Sermon Title",
    },
  ]);

  await seed.church_lessons([
    {
      id: 3,
      series_id: 67,
      lesson_number: 2,
      lesson_id: 3,
    },
    {
      id: 4,
      series_id: 124,
      lesson_number: 2,
      lesson_id: 4,
    },
    {
      id: 5,
      series_id: 125,
      lesson_number: 1,
      lesson_id: 5,
    },
  ]);

  await seed.lessons_events([
    {
      id: 3,
      lesson_id: 3,
      event_id: 3,
    },
    {
      id: 4,
      lesson_id: 4,
      event_id: 4,
    },
    {
      id: 5,
      lesson_id: 5,
      event_id: 5,
    },
  ]);
}
