CREATE POLICY "Enable read access for all users" ON "public"."church_lessons"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."series"
  FOR SELECT
  TO PUBLIC
  USING (true);
