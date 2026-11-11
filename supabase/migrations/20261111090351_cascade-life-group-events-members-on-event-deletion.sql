ALTER TABLE "public"."life_group_events_members"
  DROP CONSTRAINT "life_group_events_members_event_id_fkey";

ALTER TABLE "public"."life_group_events_members"
  ADD CONSTRAINT "life_group_events_members_event_id_fkey" FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;
