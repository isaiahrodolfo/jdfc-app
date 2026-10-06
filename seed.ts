import { createSeedClient } from "@snaplet/seed";
import { seedInitialData } from "./supabase/seed/initialData";
import { seedLessonsEventsLinks } from "./supabase/seed/lessonsEventsLinks";
import { seedLifeClass } from "./supabase/seed/lifeClass";
import { seedLifeGroupEvents } from "./supabase/seed/lifeGroupEvents";
import { seedSermonsEventLessons } from "./supabase/seed/sermonsEventLessons";

async function main() {
  // const dummyUser1 = "bb222d2c-5124-4782-852f-2b92142ed391";

  const seed = await createSeedClient();

  await seedInitialData(seed);
  await seedSermonsEventLessons(seed);
  await seedLessonsEventsLinks(seed);

  const { users } = await seed.users((x) => x(3));

  const dummyUserId1 = users[0].id;
  const dummyUserId2 = users[1].id;
  const dummyUserId3 = users[2].id;

  await seedLifeClass(seed, dummyUserId1);
  await seedLifeGroupEvents(seed, dummyUserId2, dummyUserId3);

  console.log("Database seeded!");
}

main();
