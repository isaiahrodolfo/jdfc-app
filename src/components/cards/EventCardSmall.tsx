import { useTheme } from "@/contexts/ThemeContext";
import { Pressable, StyleSheet, Text, View } from "react-native";
import InfoIcon from "../../../assets/icons/InfoIndigo5.svg";
import { dateFormatter } from "../helpers/dateFormatter";
import getCategoryColor from "../helpers/getCategoryColor";

type EventCardSmallProps = {
  title: string;
  date: Date;
  location: string;
  onInfoPress: (title: string, date: Date, location: string) => void;
};

export default function EventCardSmall({
  title,
  date,
  location,
  onInfoPress,
}: EventCardSmallProps) {
  const { theme, fonts } = useTheme();

  const colorName = getCategoryColor(title);

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
      <Pressable
        style={styles.infoIcon}
        onPress={() => onInfoPress(title, date, location)}
      >
        <InfoIcon />
      </Pressable>
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
    top: 16,
    right: 16,
  },
});
