INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmation_token,
  recovery_token,
  email_change,
  email_change_token_new,
  email_change_token_current,
  phone_change,
  phone_change_token,
  reauthentication_token,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'e2533067-88fd-47a5-a62a-a6494d45d10e',
  'authenticated',
  'authenticated',
  'devotional-test@jdfc.local',
  crypt('devotional-test-password', gen_salt('bf')),
  now(),
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Devotional Test User"}'::jsonb,
  now(),
  now()
)
ON CONFLICT (id) DO UPDATE SET
  instance_id = EXCLUDED.instance_id,
  email = EXCLUDED.email,
  encrypted_password = EXCLUDED.encrypted_password,
  email_confirmed_at = EXCLUDED.email_confirmed_at,
  confirmation_token = EXCLUDED.confirmation_token,
  recovery_token = EXCLUDED.recovery_token,
  email_change = EXCLUDED.email_change,
  email_change_token_new = EXCLUDED.email_change_token_new,
  email_change_token_current = EXCLUDED.email_change_token_current,
  phone_change = EXCLUDED.phone_change,
  phone_change_token = EXCLUDED.phone_change_token,
  reauthentication_token = EXCLUDED.reauthentication_token,
  raw_app_meta_data = EXCLUDED.raw_app_meta_data,
  raw_user_meta_data = EXCLUDED.raw_user_meta_data,
  updated_at = now();

INSERT INTO auth.identities (
  provider_id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
VALUES (
  'e2533067-88fd-47a5-a62a-a6494d45d10e',
  'e2533067-88fd-47a5-a62a-a6494d45d10e',
  '{"sub":"e2533067-88fd-47a5-a62a-a6494d45d10e","email":"devotional-test@jdfc.local"}'::jsonb,
  'email',
  now(),
  now(),
  now()
)
ON CONFLICT DO NOTHING;

INSERT INTO public.profiles (id, full_name)
VALUES (
  'e2533067-88fd-47a5-a62a-a6494d45d10e',
  'Devotional Test User'
)
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name;

INSERT INTO public.lessons (id, title, is_user_completable)
VALUES (920001, 'Jest devotional fixture', true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  is_user_completable = EXCLUDED.is_user_completable;

INSERT INTO public.devotion_lessons (odb_link, date, lesson_id)
VALUES (
  'https://example.test/devotional/jest-fixture',
  CURRENT_DATE,
  920001
)
ON CONFLICT (lesson_id) DO UPDATE SET
  odb_link = EXCLUDED.odb_link,
  date = EXCLUDED.date,
  lesson_id = EXCLUDED.lesson_id;
