ALTER TABLE "public"."events"
  DROP COLUMN "announcement_end";

ALTER TABLE "public"."events"
  ADD COLUMN "timestamp_end" timestamp WITH time zone;

CREATE POLICY "Enable insert for authenticated users only" ON "public"."events"
  FOR ALL
  TO "authenticated"
  USING (true)
  WITH CHECK (true);
