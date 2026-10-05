import { createSeedClient } from "@snaplet/seed";
import { seedLifeClass } from "./supabase/seed/lifeClass";

async function main() {
  const dummyUser1 = "730f56c1-e416-4cce-b927-febd8471c8a9";

  const seed = await createSeedClient();

  // Step 1: Seed initial data
  // await seedInitialData(seed);
  // await seedSermonsEventLessons(seed);
  // await seedLessonsEventsLinks(seed);

  // Step 2: Create a user

  // Step 3: Seed the data with the existing user
  await seedLifeClass(seed, dummyUser1);

  console.log("Database seeded!");
}

main();
