import { AccentColor } from "@/constants/theme";
import { Text, View } from "react-native";

type LessonProps = {
  isCompleted: boolean;
  colorName: AccentColor;
  size: "big" | "small";
};

export default function Lesson({ isCompleted, size }: LessonProps) {
  return (
    <View>
      <Text>Lesson</Text>
    </View>
  );
}
