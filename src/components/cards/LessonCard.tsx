import { AccentColor } from "@/constants/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { useAuthContext } from "@/hooks/use-auth-context";
import ChevronCompact from "../../../assets/icons/ChevronCompactIndigo5.svg";
import DividingLine from "../miscellaneous/DividingLine";
import Checkbox from "../progress_tracker/Checkbox";

type LessonCardProps = {
  isCompleted: boolean;
  isUserCompletable: boolean;
  colorName: AccentColor;
  size: "big" | "medium" | "small";
  descriptionHeading?: string;
  descriptionSubheading?: string;
  titleHeading: string;
  titleSubheading?: string;
  imageLink?: string;
  onCheckboxPress: () => void;
  onLessonPress: () => void;
};

export default function LessonCard({
  isCompleted,
  isUserCompletable,
  colorName,
  size,
  descriptionHeading,
  descriptionSubheading,
  titleHeading,
  titleSubheading,
  imageLink,
  onCheckboxPress,
  onLessonPress,
}: LessonCardProps) {
  const { user } = useAuthContext();
  const { theme, fonts } = useTheme();

  const hasDescription = !!descriptionSubheading || !!descriptionHeading;

  const hasTitle = !!titleSubheading || !!titleHeading;

  return (
    <View style={styles.container}>
      {(size === "medium" || size === "big") &&
        (imageLink ? (
          <Image
            style={[
              styles.topAccentShape,
              { height: size === "medium" ? 56 : 196 },
            ]}
            source={{ uri: imageLink }}
          />
        ) : (
          <View
            style={[
              styles.topAccentShape,
              {
                backgroundColor: theme[colorName],
                height: size === "medium" ? 96 : 196,
              },
            ]}
          />
        ))}

      <View style={styles.bottomHalf}>
        <View
          style={[
            styles.checkboxContainer,
            {
              borderTopLeftRadius: size === "small" ? 8 : 0,
              backgroundColor: theme[`${colorName}Shadow`],
            },
          ]}
        >
          <View
            style={{ opacity: isUserCompletable ? 1 : isCompleted ? 1 : 0.5 }}
          >
            <Checkbox
              colorName={colorName}
              checkmarkColor={theme.primary}
              type="Secondary"
              isChecked={isCompleted}
              isCurrent={false}
              onCheckboxPress={isUserCompletable ? onCheckboxPress : () => {}}
              // TODO: Have a person raising their hand for the attendance marker, and change the color/icon to show that it cannot be user modified.
            />
          </View>
        </View>

        <View style={styles.contentContainer}>
          {hasDescription && (
            <View
              style={[
                styles.descriptionColumn,
                {
                  backgroundColor: theme.secondary,
                  borderTopRightRadius:
                    (size === "small" && descriptionSubheading) ||
                    descriptionHeading
                      ? 8
                      : 0,
                },
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
                {
                  backgroundColor: theme.secondary,
                  borderTopRightRadius:
                    size === "small" &&
                    !descriptionSubheading &&
                    !descriptionHeading
                      ? 8
                      : 0,
                },
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={onLessonPress}
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
              </View>
              <ChevronCompact style={styles.chevronCompact} />
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
    flexGrow: 1,
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
    right: 24,
  },
});
