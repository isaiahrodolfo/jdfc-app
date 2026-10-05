ALTER TABLE "public"."lessons_events"
  DROP COLUMN "is_user_completable";

ALTER TABLE "public"."lessons"
  ADD COLUMN "is_user_completable" boolean NOT NULL DEFAULT false;
