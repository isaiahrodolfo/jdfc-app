import type { createSeedClient } from "@snaplet/seed";
import { Client } from "pg";
import { getEventEndTimestamp } from "./eventDuration";

export async function seedLifeGroupEvents(
  seed: Awaited<ReturnType<typeof createSeedClient>>,
  client: Client,
  dummyUserId1: string,
  dummyUserId2: string,
) {
  // Creating:
  // two life groups,
  // one life group member per group,
  // and one life group per member,
  const { life_groups } = await seed.life_groups([
    { name: "Life Group Name 1" },
    { name: "Life Group Name 2" },
  ]);

  await client.query(
    `
    UPDATE public.profiles
    SET
      birthday = $1,
      avatar_link = $2,
      facebook_link = $3,
      instagram_link = $4,
      is_life_group_admin = true,
      life_group_role_id = $5,
      life_group_id = $6
    WHERE id = $7
  `,
    [
      "2004-05-15",
      "https://example.com/abc-avatar.jpg",
      "https://facebook.com/abc",
      "https://instagram.com/abc",
      1,
      life_groups[0].id,
      dummyUserId1,
    ],
  );

  await client.query(
    `
    UPDATE public.profiles
    SET
      birthday = $1,
      avatar_link = $2,
      facebook_link = $3,
      instagram_link = $4,
      is_life_group_admin = true,
      life_group_role_id = $5,
      life_group_id = $6
    WHERE id = $7
  `,
    [
      "2003-11-22",
      "https://example.com/def-avatar.jpg",
      "https://facebook.com/def",
      "https://instagram.com/def",
      2,
      life_groups[1].id,
      dummyUserId2,
    ],
  );

  const lifeGroupTimestamp = new Date("2026-10-09T19:00:00-07:00");
  const { events } = await seed.events([
    {
      life_group_id: life_groups[0].id,
      title: "Life Group",
      location: "House 1",
      timestamp: lifeGroupTimestamp, // October 9, 2026 at 7:00 pm Local Time
      timestamp_end: getEventEndTimestamp("Life Group", lifeGroupTimestamp),
      event_type_id: 6,
    },
    {
      life_group_id: life_groups[1].id,
      title: "Life Group",
      location: "House 2",
      timestamp: lifeGroupTimestamp, // October 9, 2026 at 7:00 pm Local Time
      timestamp_end: getEventEndTimestamp("Life Group", lifeGroupTimestamp),
      event_type_id: 6,
    },
  ]);

  await seed.life_group_events_members([
    {
      event_id: events[0].id,
      user_id: dummyUserId1,
      event_availability_id: 1,
    },
    {
      event_id: events[1].id,
      user_id: dummyUserId2,
      event_availability_id: 2,
    },
  ]);
}
