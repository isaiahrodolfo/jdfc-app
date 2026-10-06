ALTER TABLE "public"."life_group_members"
  DROP CONSTRAINT "life_group_members_life_group_id_fkey";

ALTER TABLE "public"."life_group_members"
  DROP CONSTRAINT "life_group_members_life_group_role_id_fkey";

ALTER TABLE "public"."life_group_members"
  DROP CONSTRAINT "life_group_members_user_id_fkey";

DROP TABLE "public"."life_group_members";

ALTER TABLE "public"."profiles"
  ADD COLUMN "life_group_id" bigint;

ALTER TABLE "public"."profiles"
  ADD COLUMN "life_group_role_id" bigint;

ALTER TABLE "public"."profiles"
  ADD COLUMN "is_life_group_admin" boolean NOT NULL DEFAULT false;

ALTER TABLE "public"."profiles"
  ADD CONSTRAINT "profiles_life_group_id_fkey" FOREIGN KEY (life_group_id) REFERENCES public.life_groups(id);

ALTER TABLE "public"."profiles"
  ADD CONSTRAINT "profiles_life_group_role_id_fkey" FOREIGN KEY (life_group_role_id) REFERENCES public.life_group_roles(id);
