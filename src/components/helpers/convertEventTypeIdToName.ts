export default function convertEventTypeIdToName(
  eventTypeId: number | null,
): string {
  switch (eventTypeId) {
    case 1:
      return "Sunday Service";
    case 2:
      return "Prayer Service";
    case 3:
      return "Consolidation";
    case 4:
      return "Life Class";
    case 5:
      return "Destiny Training";
    case 6:
      return "Life Group";
    default:
      return "";
  }
}
