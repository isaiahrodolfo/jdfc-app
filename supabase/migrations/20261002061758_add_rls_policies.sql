CREATE POLICY "Enable read access for authenticatedusers" ON "public"."events"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Enable read access for authenticated users" ON "public"."lessons"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Enable read access for authenticated users" ON "public"."lessons_events"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Enable read access for authenticated users" ON "public"."lessons_events_link"
  FOR SELECT
  TO "authenticated"
  USING (true);
