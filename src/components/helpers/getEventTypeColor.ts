import { AccentColor } from "@/constants/theme";

export type CategoryColor =
  | "sundayService"
  | "prayerService"
  | "blue"
  | "green"
  | "purple"
  | "lifeGroup"
  | AccentColor;

export default function getEventTypeColor(eventTypeId: number): CategoryColor {
  switch (eventTypeId) {
    case 1:
      return "sundayService";
    case 2:
      return "prayerService";
    case 3:
      return "blue";
    case 4:
      return "green";
    case 5:
      return "purple";
    case 6:
      return "lifeGroup";
    default:
      return "yellow";
  }
}
