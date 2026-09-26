import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet, Text, View } from "react-native";
import InfoIcon from "../../../assets/icons/InfoIndigo3.svg";

type AnnouncementCardProps = {
  title: string;
  subtitle: string;
  colorName: "accent" | "accentAlt";
};

export default function AnnouncementCard({
  title,
  subtitle,
  colorName,
}: AnnouncementCardProps) {
  const { theme, fonts } = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme[`${colorName}`] }]}
    >
      <View style={styles.textContainer}>
        <Text
          style={{
            fontFamily: fonts.family,
            fontSize: fonts.sizes.p,
            color: theme.textAccent,
          }}
        >
          {subtitle}
        </Text>
        <Text
          style={{
            fontFamily: fonts.family,
            fontSize: fonts.sizes.h5,
            fontWeight: "bold",
            textTransform: "uppercase",
            color: theme.textAccent,
          }}
        >
          {title}
        </Text>
      </View>
      <InfoIcon style={styles.infoIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 330, //testing
    borderRadius: 8,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    paddingRight: 48,
  },
  textContainer: {
    gap: 4,
  },
  infoIcon: {
    position: "absolute",
    top: 12,
    right: 12,
  },
});
