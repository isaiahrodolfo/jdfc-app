SET local check_function_bodies = off;

CREATE TABLE "public"."profiles" (
  "id"         uuid                     NOT NULL,
  "updated_at" timestamp with time zone,
  "full_name"  text,
  "avatar_url" text,
  "website"    text,
  CONSTRAINT "profiles_pkey" PRIMARY KEY (id),
  CONSTRAINT "username_length" CHECK ((char_length(full_name) >= 3))
);

ALTER TABLE "public"."profiles"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."todos" (
  "id"    bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  "title" text   NOT NULL,
  CONSTRAINT "todos_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."todos"
  ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO ''
  AS $function$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.rls_auto_enable()
  RETURNS event_trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'pg_catalog'
  AS $function$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$function$;

ALTER TABLE "public"."profiles"
  ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Users can insert their own profile." ON "public"."profiles"
  FOR INSERT
  TO PUBLIC
  WITH CHECK ((( SELECT auth.uid() AS uid) = id));

CREATE POLICY "Users can update own profile." ON "public"."profiles"
  FOR UPDATE
  TO PUBLIC
  USING ((( SELECT auth.uid() AS uid) = id));

CREATE POLICY "Anyone can read todos" ON "public"."todos"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Anyone can upload an avatar." ON "storage"."objects"
  FOR INSERT
  TO PUBLIC
  WITH CHECK ((bucket_id = 'avatars'::text));

CREATE POLICY "Avatar images are publicly accessible." ON "storage"."objects"
  FOR SELECT
  TO PUBLIC
  USING (((bucket_id = 'avatars'::text) AND storage.allow_any_operation(ARRAY['object.get_authenticated_info'::text, 'object.get_authenticated'::text])));

CREATE POLICY "Give users authenticated access to slideshows ibhvr9_0" ON "storage"."objects"
  FOR SELECT
  TO "authenticated"
  USING ((bucket_id = 'slideshows'::text));

CREATE EVENT TRIGGER "ensure_rls"
  ON ddl_command_end
  WHEN TAG IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
  EXECUTE FUNCTION "public"."rls_auto_enable"();

GRANT EXECUTE ON FUNCTION "public"."handle_new_user"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT EXECUTE ON FUNCTION "public"."rls_auto_enable"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."profiles" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."todos" TO "anon", "authenticated", "postgres", "service_role";

