ALTER TABLE "public"."events"
  ALTER COLUMN "timestamp" DROP DEFAULT;

ALTER TABLE "public"."events"
  ALTER COLUMN "timestamp" TYPE timestamp WITH time zone USING "timestamp"::timestamp WITH time zone;
