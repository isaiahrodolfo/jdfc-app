ALTER TABLE "public"."events"
  DROP COLUMN "timestamp";

ALTER TABLE "public"."events"
  ADD COLUMN "timestamp_start" timestamp WITH time zone;
