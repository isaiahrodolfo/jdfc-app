import { AccentColor } from "@/constants/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet, Text, View } from "react-native";
import InfoIcon from "../../../assets/icons/InfoIndigo5.svg";

type EventCardProps = {
  title: string;
  date: string;
  time: string;
  location: string;
  colorName: "sundayService" | "prayerService" | "lifeGroup" | AccentColor;
};

export default function EventCard({
  title,
  date,
  time,
  location,
  colorName,
}: EventCardProps) {
  const { theme, fonts } = useTheme();
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
          {date}
          {"  "}@{time}
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
    width: 330, //testing
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
