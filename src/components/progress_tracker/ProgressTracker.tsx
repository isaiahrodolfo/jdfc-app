import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet, Text, View } from "react-native";
import CheckboxesContainer, { CheckboxData } from "./CheckboxesContainer";

type ProgressTrackerProps = {
  colorName: "yellow" | "green" | "blue" | "purple";
  checkboxesData: CheckboxData[];
  subtitles: string[];
};

export default function ProgressTracker({
  colorName,
  checkboxesData,
  subtitles,
}: ProgressTrackerProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <CheckboxesContainer
        colorName={colorName}
        checkboxesData={checkboxesData}
      />
      <View style={styles.textContainer}>
        {subtitles.map((subtitle, index) => (
          <Text key={index} style={{ color: theme.textAlt }}>
            {subtitle}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 16,
  },
  textContainer: {
    flexDirection: "column",
    gap: 8,
  },
});
