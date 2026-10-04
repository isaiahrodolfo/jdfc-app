import type { createSeedClient } from "@snaplet/seed";

export async function seedLessonsEventsLinks(
  seed: Awaited<ReturnType<typeof createSeedClient>>,
) {
  await seed.lessons_events_link([
    {
      id: 1,
      livestream_link: "youtube.com/1", // testing
      is_live: true,
      lessons_events_id: 1,
    },
    {
      id: 2,
      livestream_link: "youtube.com/2", // testing
      is_live: false,
      lessons_events_id: 2,
    },
    {
      id: 3,
      livestream_link: "youtube.com/3", // testing
      is_live: false,
      lessons_events_id: 3,
    },
    {
      id: 4,
      livestream_link: "youtube.com/4", // testing
      is_live: false,
      lessons_events_id: 4,
    },
    {
      id: 5,
      livestream_link: "youtube.com/5", // testing
      is_live: false,
      lessons_events_id: 5,
    },
  ]);
}
