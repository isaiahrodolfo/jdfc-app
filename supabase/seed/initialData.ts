import type { createSeedClient } from "@snaplet/seed";

export async function seedInitialData(
  seed: Awaited<ReturnType<typeof createSeedClient>>,
) {
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
    // { We already have this in seedLifeClass
    //   id: 2,
    //   name: "Learning From Our Mistakes",
    //   series_number: 1,
    //   track_id: 4,
    // },
    {
      id: 11,
      name: "DT Example Title",
      series_number: 1,
      track_id: 5,
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
      information:
        "Hi! Welcome to the JDFC App! This is a sample announcement. You can edit or delete this announcement in the Supabase dashboard.",
    },
    {
      id: 2,
      name: "Financial Announcement",
      category: "Financial",
      announcement_end: new Date("January 1, 2027"),
      color: "accentAlt",
      information:
        "This is a sample financial announcement. You can edit or delete this announcement in the Supabase dashboard.",
    },
  ]);
}
