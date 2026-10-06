-- Life group events: event_id and life_group_id must be unique.
CREATE UNIQUE INDEX idx_life_group_events_event_id_life_group_id
ON life_group_events (event_id, life_group_id);