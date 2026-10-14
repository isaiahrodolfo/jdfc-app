const threeHourEventTitles = new Set([
  "Sunday Service",
  "Prayer Service",
  "Life Group",
]);

export function getEventEndTimestamp(title: string, timestamp: Date): Date {
  const durationHours = threeHourEventTitles.has(title) ? 3 : 1;
  return new Date(timestamp.getTime() + durationHours * 60 * 60 * 1000);
}

export function getPacificSundayTimestamp(weekOffset: number): Date {
  const date = new Date(Date.UTC(2027, 0, 3 + weekOffset * 7));
  const dateString = date.toISOString().slice(0, 10);
  const timezoneName = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    timeZoneName: "shortOffset",
  })
    .formatToParts(new Date(`${dateString}T20:00:00Z`))
    .find((part) => part.type === "timeZoneName")?.value;
  const offsetMatch = timezoneName?.match(/^GMT([+-]\d{1,2})$/);

  if (!offsetMatch) {
    throw new Error(
      `Unable to determine Pacific timezone offset for ${dateString}`,
    );
  }

  const offsetHours = Number(offsetMatch[1]);
  const offset = `${offsetHours < 0 ? "-" : "+"}${String(
    Math.abs(offsetHours),
  ).padStart(2, "0")}:00`;

  return new Date(`${dateString}T13:00:00${offset}`);
}
