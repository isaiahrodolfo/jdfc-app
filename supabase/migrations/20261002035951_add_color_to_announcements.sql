CREATE POLICY "Enable read access for authenticated users" ON "public"."announcements"
  FOR SELECT
  TO "authenticated"
  USING (true);
