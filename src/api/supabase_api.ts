export type NoteType = "devotionals" | "slideshows";

export function saveNotes(
  text: string,
  unique_identifier: string,
  note_type: NoteType,
) {
  console.log("saveNotes() was triggered with", {
    text,
    unique_identifier,
    note_type,
  });
}
