import { AccentColor } from "@/constants/theme";

export type Category =
  | "Sunday Service"
  | "Prayer Service"
  | "Life Group"
  | string;
export type CategoryColor =
  | "sundayService"
  | "prayerService"
  | "lifeGroup"
  | AccentColor;

export default function getCategoryColor(category: Category): CategoryColor {
  switch (category) {
    case "Sunday Service":
      return "sundayService";
    case "Prayer Service":
      return "prayerService";
    case "Life Group":
      return "lifeGroup";
    default:
      return "yellow";
  }
}
