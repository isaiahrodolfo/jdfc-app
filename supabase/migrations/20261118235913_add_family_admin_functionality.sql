SET local check_function_bodies = off;

ALTER TABLE "public"."profiles"
  ADD COLUMN "is_family_admin" boolean NOT NULL;

CREATE OR REPLACE FUNCTION public.is_family_admin_for (
  target_family_id bigint
)
  RETURNS boolean
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
  select exists (
    select 1
    from public.profiles p
    where p.id = (select auth.uid())
      and p.family_id = target_family_id
      and p.is_family_admin = true
  );
$function$;

CREATE POLICY "Family admins can update their family's profiles." ON "public"."profiles"
  FOR UPDATE
  TO "authenticated"
  USING (public.is_family_admin_for(family_id))
  WITH CHECK (public.is_family_admin_for(family_id));

REVOKE ALL ON FUNCTION "public"."is_family_admin_for"(bigint) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION "public"."is_family_admin_for"(bigint) TO "anon", "authenticated";

REVOKE ALL ON FUNCTION "public"."is_family_admin_for"(bigint) FROM "postgres";

GRANT EXECUTE ON FUNCTION "public"."is_family_admin_for"(bigint) TO "postgres";

GRANT EXECUTE ON FUNCTION "public"."is_family_admin_for"(bigint) TO "service_role";
