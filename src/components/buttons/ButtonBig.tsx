import { useTheme } from "@/contexts/ThemeContext";
import { Pressable, StyleSheet, Text } from "react-native";

type ButtonBigProps = {
  icon: React.ComponentType;
  text: string;
  onPress?: () => void;
  disabled?: boolean;
};

export default function ButtonBig({
  icon: Icon,
  text,
  onPress,
  disabled = false,
}: ButtonBigProps) {
  const { theme, fonts } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: theme.iconPrimary,
          opacity: disabled ? 0.5 : pressed ? 0.75 : 1,
        },
      ]}
    >
      <Icon />
      <Text
        style={[
          styles.text,
          {
            fontFamily: fonts.family,
            fontSize: fonts.sizes.h5,
            fontWeight: "bold",
            textTransform: "uppercase",
            color: theme.textAccent,
          },
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingTop: 16,
    paddingBottom: 16, // TODO: Do I add paddingLeft and Right if this button is always centered?
    borderRadius: 12,
    justifyContent: "center",
  },
  text: {},
});
