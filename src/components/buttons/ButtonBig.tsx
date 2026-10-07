import { useTheme } from "@/contexts/ThemeContext";
import { ReactNode } from "react";
import { ColorValue, Pressable, StyleSheet, Text } from "react-native";

type ButtonBigProps = {
  icon?: ReactNode;
  text: string;
  textColor: ColorValue;
  backgroundColor: ColorValue;
  onButtonPress: () => void;
};

export default function ButtonBig({
  icon,
  text,
  textColor,
  backgroundColor,
  onButtonPress,
}: ButtonBigProps) {
  const { theme, fonts } = useTheme();

  // console.log("Icon:", Icon);
  // console.log("Icon type:", typeof Icon);

  return (
    <Pressable
      style={[styles.container, { backgroundColor: backgroundColor }]}
      onPress={onButtonPress}
    >
      {icon}
      <Text
        style={[
          styles.text,
          {
            fontFamily: fonts.family,
            fontSize: fonts.sizes.h5,
            fontWeight: "bold",
            textTransform: "uppercase",
            color: textColor,
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
    gap: 16,
    paddingTop: 16,
    paddingBottom: 16, // TODO: Do I add paddingLeft and Right if this button is always centered?
    borderRadius: 12,
    justifyContent: "center",
  },
  text: {},
});
