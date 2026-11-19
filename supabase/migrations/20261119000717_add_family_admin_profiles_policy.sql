CREATE POLICY "Family admins can update their family's profiles"
ON public.profiles
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles AS admin
    WHERE admin.id = (SELECT auth.uid())
      AND admin.is_family_admin = TRUE
  )
)
WITH CHECK (
  -- Add the condition restricting which profiles
  -- the administrator is allowed to update.
  TRUE
);