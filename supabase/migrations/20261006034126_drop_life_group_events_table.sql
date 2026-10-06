DROP INDEX "public"."idx_life_group_events_members_all";

ALTER TABLE "public"."life_group_events"
  DROP CONSTRAINT "life_group_events_creator_user_id_fkey";

ALTER TABLE "public"."life_group_events"
  DROP CONSTRAINT "life_group_events_event_id_fkey";

ALTER TABLE "public"."life_group_events_members"
  DROP CONSTRAINT "life_group_events_members_life_group_event_id_fkey";

ALTER TABLE "public"."life_group_events_members"
  DROP COLUMN "life_group_event_id";

DROP TABLE "public"."life_group_events";

ALTER TABLE "public"."life_group_events_members"
  ADD COLUMN "event_id" bigint;

ALTER TABLE "public"."life_group_events_members"
  ADD CONSTRAINT "life_group_events_members_event_id_fkey" FOREIGN KEY (event_id) REFERENCES public.events(id);

CREATE UNIQUE INDEX idx_life_group_events_members_all ON public.life_group_events_members USING btree (event_availability_id, event_id, user_id);
