SELECT
    cl.lesson_id,
    l.is_user_completable,
    s.track_id,
    s.series_number,
    ulc.user_id,
    ulc.is_completed
FROM church_lessons cl
INNER JOIN lessons l
    ON l.id = cl.lesson_id
INNER JOIN series s
    ON s.id = cl.series_id
LEFT JOIN users_lessons_completions ulc
    ON ulc.lesson_id = l.id
ORDER BY
    s.track_id,
    s.series_number,
    cl.lesson_id;