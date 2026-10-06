import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet, Text, View } from "react-native";

import { useWindowDimensions } from "react-native";
import { dateFormatter } from "../helpers/dateFormatter";
import getEventTypeColor from "../helpers/getEventTypeColor";

type PreviewTitleCardProps = {
  eventTypeId: number;
  title: string;
  subtitle?: string;
  category?: string;
  timestamp?: Date;
  location?: string;
  hasTopAccent?: boolean;
  backgroundColor?: "primary" | "secondary";
};

export default function PreviewTitleCard({
  eventTypeId,
  title,
  subtitle,
  category,
  timestamp,
  location,
  hasTopAccent = true,
  backgroundColor = "secondary",
}: PreviewTitleCardProps) {
  const { theme, fonts } = useTheme();
  const { height } = useWindowDimensions();

  const colorName = getEventTypeColor(eventTypeId);

  return (
    <View style={styles.container}>
      {hasTopAccent && (
        <View
          style={[
            styles.topAccentShape,
            {
              backgroundColor: theme[colorName],
              top: -height,
              height: 192 + height,
            },
          ]}
        ></View>
      )}
      <View
        style={[
          styles.contentContainer,
          {
            backgroundColor: theme[backgroundColor],
            top: hasTopAccent ? 192 : 0,
          },
        ]}
      >
        {category !== undefined && (
          <Text
            style={{
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h5,
              color: theme.text,
            }}
          >
            {category}
          </Text>
        )}
        <Text
          style={{
            fontFamily: fonts.family,
            fontSize: fonts.sizes.h2,
            fontWeight: "bold",
            color: theme.text,
          }}
        >
          {title}
        </Text>
        {subtitle !== undefined && (
          <Text
            style={{
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h6,
              color: theme.text,
            }}
          >
            {subtitle}
          </Text>
        )}
        {timestamp && (
          <Text
            style={{
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h6,
              color: theme.text,
            }}
          >
            {dateFormatter("full").format(timestamp)}
          </Text>
        )}
        {location && (
          <Text
            style={{
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h6,
              color: theme.text,
            }}
          >
            {location}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },

  topAccentShape: {
    position: "absolute",
    left: 0,
    width: "100%",
  },
  //   bottomHalf: {
  //     flexDirection: "row",
  //   },
  //   checkboxContainer: {
  //     alignItems: "center",
  //     justifyContent: "center",
  //     padding: 16,
  //     borderBottomLeftRadius: 8,
  //   },
  contentContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 4,
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  //   textColumn: {
  //     width: "100%",
  //   },
  //   titleColumn: {
  //     width: "100%",
  //     justifyContent: "center",
  //     paddingRight: 24,
  //     gap: 2,
  //   },
  chevronCompact: {
    position: "absolute",
    right: 0,
  },
});
