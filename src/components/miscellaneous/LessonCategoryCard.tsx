import { useTheme } from "@/contexts/ThemeContext";
import { ColorValue, Pressable, StyleSheet, Text, View } from "react-native";

import ChevronCompact from "../../../assets/icons/ChevronCompactIndigo5.svg";

type LessonCategoryCardProps = {
  color: ColorValue;
  titleHeading: string;
  onPress: () => void;
};

export default function LessonCategoryCard({
  color,
  titleHeading,
  onPress,
}: LessonCategoryCardProps) {
  const { theme, fonts } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: theme.secondary },
        { opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={onPress}
    >
      <View style={styles.bottomHalf}>
        <View
          style={[styles.leftAccentShape, { backgroundColor: color }]}
        ></View>
        <View style={styles.contentContainer}>
          <View style={styles.titleColumn}>
            <View style={styles.columnContent}>
              <Text
                style={{
                  fontFamily: fonts.family,
                  fontSize: fonts.sizes.h5,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: theme.text,
                }}
              >
                {titleHeading}
              </Text>
            </View>
            <ChevronCompact style={styles.chevronCompact} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 4,
  },

  leftAccentShape: {
    width: 16,
    height: "100%",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },

  bottomHalf: {
    flexDirection: "row",
  },

  contentContainer: {
    flexGrow: 1,
    width: 0,
    flexDirection: "column",
    overflow: "hidden",
  },

  descriptionColumn: {
    width: "100%",
    paddingTop: 20,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 24,
  },

  titleColumn: {
    width: "100%",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 48,
    paddingVertical: 16,
    gap: 2,
  },

  columnContent: {
    gap: 4,
  },

  chevronCompact: {
    position: "absolute",
    right: 12,
  },
});
