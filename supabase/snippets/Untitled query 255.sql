SELECT
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS referenced_table,
    ccu.column_name AS referenced_column
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.constraint_schema = kcu.constraint_schema
JOIN information_schema.constraint_column_usage ccu
    ON tc.constraint_name = ccu.constraint_name
    AND tc.constraint_schema = ccu.constraint_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name = 'church_lessons';