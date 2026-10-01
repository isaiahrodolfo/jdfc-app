-- Life group events: event_id must be unique.
CREATE UNIQUE INDEX idx_life_group_events_event_id
ON life_group_events (event_id);