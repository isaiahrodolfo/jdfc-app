const threeHourEventTitles = new Set([
  "Sunday Service",
  "Prayer Service",
  "Life Group",
]);

export function getEventEndTimestamp(title: string, timestamp: Date): Date {
  const durationHours = threeHourEventTitles.has(title) ? 3 : 1;
  return new Date(timestamp.getTime() + durationHours * 60 * 60 * 1000);
}
