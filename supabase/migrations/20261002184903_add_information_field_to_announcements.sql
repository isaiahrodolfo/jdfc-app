ALTER TABLE "public"."devotion_lessons"
  DROP COLUMN "title";

ALTER TABLE "public"."announcements"
  ADD COLUMN "information" text;

CREATE POLICY "Enable insert for authenticated users only" ON "public"."devotion_lessons"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users" ON "public"."devotion_lessons"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."lessons"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (true);
