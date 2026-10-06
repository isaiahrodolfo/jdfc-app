import { createSeedClient } from "@snaplet/seed";
import { createDbClient } from "./seed.config";

import { seedInitialData } from "./supabase/seed/initialData";
import { seedLessonsEventsLinks } from "./supabase/seed/lessonsEventsLinks";
import { seedLifeClass } from "./supabase/seed/lifeClass";
import { seedLifeGroupEvents } from "./supabase/seed/lifeGroupEvents";
import { seedSermonsEventLessons } from "./supabase/seed/sermonsEventLessons";

async function main() {
  const seed = await createSeedClient();
  const client = await createDbClient();

  try {
    await seedInitialData(seed);
    await seedSermonsEventLessons(seed);
    await seedLessonsEventsLinks(seed);

    const { users } = await seed.users([
      {
        raw_user_meta_data: {
          full_name: "ABC",
        },
      },
      {
        raw_user_meta_data: {
          full_name: "DEF",
        },
      },
      {
        raw_user_meta_data: {
          full_name: "GHI",
        },
      },
    ]);

    await seedLifeClass(seed, users[0].id);

    await seedLifeGroupEvents(seed, client, users[1].id, users[2].id);

    console.log("Database seeded!");
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
