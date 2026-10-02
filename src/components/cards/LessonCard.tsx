import { AccentColor } from "@/constants/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { Pressable, StyleSheet, Text, View } from "react-native";

import ChevronCompact from "../../../assets/icons/ChevronCompactIndigo5.svg";
import DividingLine from "../miscellaneous/DividingLine";
import Checkbox from "../progress_tracker/Checkbox";

type LessonCardProps = {
  isCompleted: boolean;
  colorName: AccentColor;
  size: "big" | "small";
  descriptionHeading: string;
  descriptionSubheading?: string;
  titleHeading: string;
  titleSubheading?: string;
};

export default function LessonCard({
  isCompleted,
  colorName,
  size,
  descriptionHeading,
  descriptionSubheading,
  titleHeading,
  titleSubheading,
}: LessonCardProps) {
  const { theme, fonts } = useTheme();

  const hasDescription = !!descriptionSubheading || !!descriptionHeading;

  const hasTitle = !!titleSubheading || !!titleHeading;

  return (
    <View style={styles.container}>
      {size === "big" && (
        <View
          style={[styles.topAccentShape, { backgroundColor: theme[colorName] }]}
        />
      )}

      <View style={styles.bottomHalf}>
        <View
          style={[
            styles.checkboxContainer,
            { backgroundColor: theme[`${colorName}Shadow`] },
          ]}
        >
          <Checkbox
            colorName={colorName}
            type="Secondary"
            isChecked={isCompleted}
            isCurrent={false}
          />
        </View>

        <View style={styles.contentContainer}>
          {hasDescription && (
            <View
              style={[
                styles.descriptionColumn,
                { backgroundColor: theme.secondary },
              ]}
            >
              <View style={styles.columnContent}>
                {descriptionSubheading && (
                  <Text
                    style={{
                      fontFamily: fonts.family,
                      fontSize: fonts.sizes.h6,
                      fontStyle: "italic",
                      textTransform: "uppercase",
                      color: theme.text,
                    }}
                  >
                    {descriptionSubheading}
                  </Text>
                )}

                {descriptionHeading && (
                  <Text
                    style={{
                      fontFamily: fonts.family,
                      fontSize: fonts.sizes.h4,
                      fontWeight: "bold",
                      color: theme.text,
                    }}
                  >
                    {descriptionHeading}
                  </Text>
                )}
              </View>
            </View>
          )}

          {hasDescription && hasTitle && (
            <DividingLine
              color={theme.secondaryAlt}
              backgroundColor={theme.secondary}
              paddingHorizontal={16}
            />
          )}

          {hasTitle && (
            <Pressable
              style={({ pressed }) => [
                styles.titleColumn,
                { backgroundColor: theme.secondary },
                { opacity: pressed ? 0.6 : 1 },
              ]}
            >
              <View style={styles.columnContent}>
                {titleSubheading && (
                  <Text
                    style={{
                      fontFamily: fonts.family,
                      fontSize: fonts.sizes.h6,
                      fontStyle: "italic",
                      color: theme.text,
                    }}
                  >
                    {titleSubheading}
                  </Text>
                )}

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

                <ChevronCompact style={styles.chevronCompact} />
              </View>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  topAccentShape: {
    width: "100%",
    height: 64,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  bottomHalf: {
    flexDirection: "row",
  },

  checkboxContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderBottomLeftRadius: 8,
  },

  contentContainer: {
    flexGrow: 1,
    width: 0,
    flexDirection: "column",
    // gap: 16,
    // paddingTop: 20,
    // paddingRight: 16,
    // paddingBottom: 16,
    // paddingLeft: 16,
    borderBottomRightRadius: 8,
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
    paddingRight: 24,
    paddingVertical: 16,
    gap: 2,
  },

  columnContent: {
    // padding: 12,
  },

  chevronCompact: {
    position: "absolute",
    right: 0,
  },
});
