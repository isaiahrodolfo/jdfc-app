import { AccentColor } from "@/constants/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet, Text, View } from "react-native";

type PreviewTitleCardProps = {
  title: string;
  category?: string;
  colorName: AccentColor;
  date: string;
  time: string;
  location: string;
};

export default function PreviewTitleCard({
  title,
  category,
  colorName,
  date,
  time,
  location,
}: PreviewTitleCardProps) {
  const { theme, fonts } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.topAccentShape,
          { backgroundColor: theme[`${colorName}`] },
        ]}
      ></View>
      <View
        style={[styles.contentContainer, { backgroundColor: theme.secondary }]}
      >
        {category !== undefined && (
          <Text
            style={{
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h6,
              color: theme.text,
            }}
          >
            {category}
          </Text>
        )}
        <Text
          style={{
            fontFamily: fonts.family,
            fontSize: fonts.sizes.h3,
            fontWeight: "bold",
            color: theme.text,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: fonts.family,
            fontSize: fonts.sizes.h5,
            color: theme.text,
          }}
        >
          {date} @{time} {"\n"}
          {location}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 402, // Testing, should be width = device width
  },
  topAccentShape: {
    width: "100%",
    height: 64,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
    gap: 8,
    paddingTop: 20,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
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
