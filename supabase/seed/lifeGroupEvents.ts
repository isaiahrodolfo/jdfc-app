import type { createSeedClient } from "@snaplet/seed";

export async function seedLifeGroupEvents(
  seed: Awaited<ReturnType<typeof createSeedClient>>,
  member1: string,
  member2: string,
) {
  // Creating:
  // two life groups,
  // one life group member per group,
  // and one life group per member,
  const { life_groups } = await seed.life_groups([
    { name: "Life Group Name 1" },
    { name: "Life Group Name 2" },
  ]);

  const { life_group_members } = await seed.life_group_members([
    {
      is_admin: true,
      life_group_id: life_groups[0].id,
      life_group_role_id: 1,
      user_id: member1,
    },
    {
      is_admin: true,
      life_group_id: life_groups[1].id,
      life_group_role_id: 1,
      user_id: member2,
    },
  ]);

  const { life_group_events } = await seed.life_group_events([
    {
      life_group_id: life_groups[0].id,
      events: {
        title: "Life Group",
        location: "House 1",
        timestamp: new Date("2026-10-09T19:00:00-07:00"), // October 9, 2026 at 7:00 pm Local Time
      },
    },
    {
      life_group_id: life_groups[1].id,
      events: {
        title: "Life Group",
        location: "House 2",
        timestamp: new Date("2026-10-09T19:00:00-07:00"), // October 9, 2026 at 7:00 pm Local Time
      },
    },
  ]);

  await seed.life_group_events_members([
    {
      event_id: life_group_events[0].event_id,
      user_id: member1,
      event_availability_id: 1,
    },
    {
      event_id: life_group_events[1].event_id,
      user_id: member2,
      event_availability_id: 2,
    },
  ]);
}
