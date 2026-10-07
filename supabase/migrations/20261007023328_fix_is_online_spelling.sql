ALTER TABLE "public"."events"
  DROP COLUMN "is_onilne";

ALTER TABLE "public"."events"
  ADD COLUMN "is_online" boolean NOT NULL DEFAULT false;
