CREATE OR REPLACE FUNCTION public.is_family_admin_for(
  target_family_id BIGINT
)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = (SELECT auth.uid())
      AND profiles.family_id = target_family_id
      AND profiles.is_family_admin = TRUE
  );
$$;

-- Restrict execution permissions
REVOKE ALL ON FUNCTION public.is_family_admin_for(BIGINT)
FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.is_family_admin_for(BIGINT)
TO authenticated;

CREATE POLICY "Family admins can update their family's profiles"
ON public.profiles
FOR UPDATE
TO authenticated
USING (
  is_family_admin_for(family_id)
)
WITH CHECK (
  is_family_admin_for(family_id)
);