import { AccentColor } from "@/constants/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet, Text, View } from "react-native";
import InfoIcon from "../../../assets/icons/InfoIndigo5.svg";

type EventCardSmallProps = {
  title: string;
  date: Date;
  location: string;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function EventCardSmall({
  title,
  date,
  location,
}: EventCardSmallProps) {
  const { theme, fonts } = useTheme();

  let colorName: "sundayService" | "prayerService" | "lifeGroup" | AccentColor; // fix "let"

  switch (title) {
    case "Sunday Service":
      colorName = "sundayService";
      break;
    case "Prayer Service":
      colorName = "prayerService";
      break;
    case "Life Group":
      colorName = "lifeGroup";
      break;
    default:
      colorName = "yellow";
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <View
        style={[
          styles.leftAccentShape,
          { backgroundColor: theme[`${colorName}`] },
        ]}
      ></View>
      <View style={styles.textContainer}>
        <Text
          style={{
            fontFamily: fonts.family,
            fontSize: fonts.sizes.h5,
            fontWeight: "bold",
            textTransform: "uppercase",
            color: theme.text,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: fonts.family,
            fontSize: fonts.sizes.p,
            color: theme.text,
          }}
        >
          {dateFormatter.format(date)}
          {"\n"}
          {location}
        </Text>
      </View>
      <InfoIcon style={styles.infoIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 8,
  },
  leftAccentShape: {
    width: 16,
    height: "100%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  textContainer: {
    gap: 4,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    paddingRight: 60,
  },
  infoIcon: {
    position: "absolute",
    top: 12,
    right: 12,
  },
});
