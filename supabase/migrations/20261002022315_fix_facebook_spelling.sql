ALTER TABLE "public"."profiles"
  DROP COLUMN "faecbook_link";

ALTER TABLE "public"."profiles"
  ADD COLUMN "facebook_link" text;
