select
  cl.id,
  cl.series_id,
  cl.lesson_id,
  l.id as lessons_id,
  l.title
from church_lessons cl
left join lessons l
  on l.id = cl.lesson_id
where cl.series_id = 67;