import { createSeedClient } from "@snaplet/seed";

export async function seedFamilyCamp(
  seed: Awaited<ReturnType<typeof createSeedClient>>,
) {
  await seed.events([
    {
      title: "Family Camp",
      location: "Family Camp Location",
      repeat_every_days: 0,
      information: "Family Camp Information",
      announcement_start: new Date(), // now
      life_group_id: null,
      event_type_id: 7,
      is_online: false,
      timestamp_start: new Date("2027-06-17T13:00:00-07:00"), // June 17, 2027 1:00 pm PT
      timestamp_end: new Date("2027-06-20T21:00:00-07:00"), // June 20, 2027 9:00 pm PT
    },
  ]);
}
