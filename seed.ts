import { createSeedClient } from "@snaplet/seed";
import { seedInitialData } from "./supabase/seed/initialData";
import { seedLessonsEventsLinks } from "./supabase/seed/lessonsEventsLinks";
import { seedLifeClass } from "./supabase/seed/lifeClass";
import { seedSermonsEventLessons } from "./supabase/seed/sermonsEventLessons";

async function main() {
  // const dummyUser1 = "bb222d2c-5124-4782-852f-2b92142ed391";

  const seed = await createSeedClient();

  // Step 1: Seed initial data
  await seedInitialData(seed);
  await seedSermonsEventLessons(seed);
  await seedLessonsEventsLinks(seed);

  // Step 2: Create a user
  // Create a dummy user and profile
  const { users } = await seed.users((x) => x(3));

  const dummyUserId1 = users[0].id;
  const dummyUserId2 = users[1].id;
  const dummyUserId3 = users[2].id;

  // Step 3: Seed the data with the existing user
  await seedLifeClass(seed, dummyUserId1);

  console.log("Database seeded!");
}

main();
