ALTER TABLE "public"."lessons_events"
  ALTER COLUMN "event_id" SET NOT NULL;

ALTER TABLE "public"."lessons_events"
  ALTER COLUMN "lesson_id" SET NOT NULL;
