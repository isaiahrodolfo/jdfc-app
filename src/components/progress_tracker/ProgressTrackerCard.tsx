import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet, Text, View } from "react-native";
import DividingLine from "../miscellaneous/DividingLine";
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
  const { theme, fonts } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <Text
        style={{
          color: theme.text,
          fontFamily: fonts.family,
          fontSize: fonts.sizes.h6,
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Progress Tracker
      </Text>
      <DividingLine color={theme.secondaryAlt} />
      {progressTrackerData.map((data, index) => (
        <View key={index} style={{ gap: 16 }}>
          <ProgressTracker
            key={index}
            colorName={colorName}
            checkboxesData={data.checkboxesData}
            subtitles={data.subtitles}
          />
          {index < progressTrackerData.length - 1 && (
            <DividingLine color={theme.secondaryAlt} />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 330, // Example width. Remember that this component relies on the device's screen width, which is responsive
    flexDirection: "column",
    gap: 16,
    paddingTop: 20,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    borderRadius: 2, // Unlike Figma
  },
});
