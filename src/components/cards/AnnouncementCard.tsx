import { useTheme } from "@/contexts/ThemeContext";
import { Lucide } from "@react-native-vector-icons/lucide";
import { Pressable, StyleSheet, Text, View } from "react-native";

type AnnouncementCardProps = {
  title: string | null;
  category: string | null;
  colorName: "accent" | "accentAlt";
  onIconPress: (title: string | null, category: string | null) => void;
};

export default function AnnouncementCard({
  title,
  category,
  colorName,
  onIconPress,
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
          {category}
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
      <Pressable
        style={({ pressed }) => [
          styles.infoIcon,
          { opacity: pressed ? 0.5 : 1 },
        ]}
        onPress={() => onIconPress(title, category)}
      >
        <Lucide size={20} name="info" color={theme.iconAccent} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
