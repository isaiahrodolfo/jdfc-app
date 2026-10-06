ALTER TABLE "public"."life_group_events"
  DROP CONSTRAINT "life_group_events_event_id_fkey";

ALTER TABLE "public"."life_group_events"
  DROP CONSTRAINT "life_group_events_life_group_id_fkey";

DROP TABLE "public"."life_group_events";

ALTER TABLE "public"."events"
  ADD COLUMN "life_group_id" bigint;

ALTER TABLE "public"."events"
  ADD CONSTRAINT "events_life_group_id_fkey" FOREIGN KEY (life_group_id) REFERENCES public.life_groups(id);
