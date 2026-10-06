SELECT
  id,
  event_id,
  lesson_id
FROM public.lessons_events
WHERE event_id IN (6, 7);