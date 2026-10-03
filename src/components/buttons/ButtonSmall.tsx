import { useTheme } from "@/contexts/ThemeContext";
import { Pressable, StyleSheet, Text } from "react-native";
import type { SvgProps } from "react-native-svg";

type ButtonSmallProps = {
  icon: React.ComponentType<SvgProps>;
  text: string;
  onPress: () => void;
};

export default function ButtonSmall({
  icon: Icon,
  text,
  onPress,
}: ButtonSmallProps) {
  const { theme, fonts } = useTheme();

  // console.log("Icon:", Icon);
  // console.log("Icon type:", typeof Icon);

  return (
    <Pressable
      style={[styles.container, { backgroundColor: theme.accentGrayAlt }]}
      onPress={onPress}
    >
      <Icon />
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
