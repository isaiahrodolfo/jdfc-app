SET local check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO ''
  AS $function$begin
  insert into public.profiles (
    id,
    full_name
  )
  values (
    new.id,
    new.raw_user_meta_data->>'full_name'
  );

  return new;
end;$function$;

ALTER TABLE "public"."church_lessons"
  ADD CONSTRAINT "church_lessons_series_id_fkey" FOREIGN KEY (series_id) REFERENCES public.series(id);
