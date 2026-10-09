import { useTheme } from "@/contexts/ThemeContext";
import { Lucide } from "@react-native-vector-icons/lucide";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { dateFormatter } from "../helpers/dateFormatter";
import getEventTypeColor from "../helpers/getEventTypeColor";

type EventCardSmallProps = {
  eventTypeId: number;
  title: string;
  timestampStart: Date;
  timestampEnd: Date;
  location: string;
  isOnline: boolean;
  onInfoPress: (
    title: string,
    timestampStart: Date,
    timestampEnd: Date,
    location: string,
    isOnline: boolean,
  ) => void;
};

export default function EventCardSmall({
  eventTypeId,
  title,
  timestampStart,
  timestampEnd,
  location,
  isOnline,
  onInfoPress,
}: EventCardSmallProps) {
  const { theme, fonts } = useTheme();

  const colorName = getEventTypeColor(eventTypeId);

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
          {dateFormatter("full").format(timestampStart)}
          {timestampEnd.getTime() !== timestampStart.getTime() &&
            ` to ${dateFormatter("full").format(timestampEnd)}`}
        </Text>
        <View>
          <Text>{location}</Text>
          <Text>{isOnline && "(Online)"}</Text>
        </View>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.infoIcon,
          { opacity: pressed ? 0.5 : 1 },
        ]}
        hitSlop={fonts.sizes.h5}
        onPress={() =>
          onInfoPress(title, timestampStart, timestampEnd, location, isOnline)
        }
      >
        <Lucide size={fonts.sizes.h5} name="info" color={theme.iconSecondary} />
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
