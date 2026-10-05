CREATE POLICY "Enable read access for all users" ON "public"."lessons_events_slides"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."lessons_events_speakers"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."tracks"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Enable all access for authenticated users" ON "public"."users_lessons"
  FOR ALL
  TO "authenticated"
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable all access for all users" ON "public"."users_lessons_completions"
  FOR ALL
  TO "authenticated"
  USING (true)
  WITH CHECK (true);
