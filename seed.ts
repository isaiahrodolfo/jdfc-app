import { createSeedClient } from "@snaplet/seed";

async function main() {
  const seed = await createSeedClient();

  await seed.tracks([
    {
      id: 1,
      name: "Sunday Service",
      heading: null,
    },
    {
      id: 2,
      name: "Prayer Service",
      heading: null,
    },
    {
      id: 3,
      name: "Consolidation",
      heading: null,
    },
    {
      id: 4,
      name: "Life Class",
      heading: "Week",
    },
    {
      id: 5,
      name: "Destiny Training",
      heading: "Module",
    },
  ]);

  await seed.series([
    {
      id: 1,
      name: "Consolidation",
      series_number: null,
      track_id: 3,
    },
    {
      id: 2,
      name: "Learning From Our Mistakes",
      series_number: 1,
      track_id: 4,
    },
    {
      id: 11,
      name: "DT Example Title",
      series_number: 1,
      track_id: 5,
    },
    {
      id: 68,
      name: "Sunday Service Sermon Series",
      series_number: null,
      track_id: 1,
    },
    {
      id: 124,
      name: "Prayer Service Sermon Series",
      series_number: null,
      track_id: 2,
    },
  ]);

  await seed.life_group_roles([
    {
      id: 1,
      name: "Leader",
    },
    {
      id: 2,
      name: "Co-leader",
    },
  ]);

  await seed.event_availabilities([
    {
      id: 1,
      name: "Going",
    },
    {
      id: 2,
      name: "Maybe",
    },
    {
      id: 3,
      name: "Not Going",
    },
  ]);

  await seed.announcements([
    {
      id: 1,
      name: "Welcome to the JDFC App!",
      category: "JDFC App",
      announcement_end: new Date("January 1, 2027"),
      color: "accent",
    },
    {
      id: 2,
      name: "Financial Announcement",
      category: "Financial",
      announcement_end: new Date("January 1, 2027"),
      color: "accentAlt",
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
      timestamp: new Date("2026-10-25T10:00:00-07:00"), // October 25, 2026 10:00 am PDT
      location: "Jesus' Disciples Family Church",
      information: "Weekly church service",
    },
  ]);

  await seed.lessons_events([
    {
      id: 1,
      lesson_id: 1,
      event_id: 1,
    },
  ]);

  await seed.lessons_events_link([
    {
      id: 1,
      livestream_link: "youtube.com", // testing
      is_live: true,
      lessons_events_id: 1,
    },
  ]);

  // Seeding an upcoming Prayer Service
  await seed.events([
    {
      id: 2,
      title: "Prayer Service",
      timestamp: new Date("2026-10-28T19:00:00-07:00"), // October 28, 2026 7:00 pm PDT
      location: "Jesus' Disciples Family Church",
      information: "Weekly prayer service",
      repeat_every_days: 7,
    },
  ]);

  console.log("Database seeded!");
}

main();
