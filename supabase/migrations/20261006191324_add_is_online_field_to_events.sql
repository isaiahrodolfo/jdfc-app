ALTER TABLE "public"."events"
  ADD COLUMN "is_onilne" boolean NOT NULL DEFAULT false;

ALTER TABLE "public"."events"
  ADD COLUMN "event_type_id" bigint;
