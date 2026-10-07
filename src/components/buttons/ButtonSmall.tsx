import { useTheme } from "@/contexts/ThemeContext";
import { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type ButtonSmallProps = {
  icon: ReactNode;
  text: string;
  onPress: () => void;
};

export default function ButtonSmall({ icon, text, onPress }: ButtonSmallProps) {
  const { theme, fonts } = useTheme();

  // console.log("Icon:", Icon);
  // console.log("Icon type:", typeof Icon);

  return (
    <Pressable
      style={[styles.container, { backgroundColor: theme.accentGrayAlt }]}
      onPress={onPress}
    >
      {icon}
      <Text
        style={[
          styles.text,
          {
            fontFamily: fonts.family,
            fontSize: fonts.sizes.h6,
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
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 8,
  },
  text: {},
});
