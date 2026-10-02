import { createSeedClient } from "@snaplet/seed";
import bcrypt from "bcrypt";

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
    },
  ]);

  const TEST_USER_ID = "00000000-0000-0000-0000-000000000001";

  const passwordHash = await bcrypt.hash("123456", 10);

  await seed.users((x) =>
    x(1, {
      id: TEST_USER_ID,
      email: "a@mail.com",
      encrypted_password: passwordHash,
    }),
  );

  console.log("Database seeded!");
}

main();
