import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet, Text, View } from "react-native";
import { CheckboxData } from "./CheckboxesContainer";
import ProgressTracker from "./ProgressTracker";

type ProgressTrackerData = {
  checkboxesData: CheckboxData[];
  subtitles: string[];
};

type ProgressTrackerCardProps = {
  colorName: "yellow" | "green" | "blue" | "purple";
  progressTrackerData: ProgressTrackerData[];
};

export default function ProgressTrackerCard({
  colorName,
  progressTrackerData,
}: ProgressTrackerCardProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <Text style={{ color: theme.text }}>Progress Tracker</Text>
      <View>
        {progressTrackerData.map((data, index) => (
          <ProgressTracker
            key={index}
            colorName={colorName}
            checkboxesData={data.checkboxesData}
            subtitles={data.subtitles}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 16,
    paddingTop: 20,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
  },
});
