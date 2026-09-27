import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet, Text, View } from "react-native";

type ButtonSmall = {
  icon: React.ComponentType;
  text: string;
};

export default function ButtonSmall({ icon: Icon, text }: ButtonSmall) {
  const { theme, fonts } = useTheme();

  console.log("Icon:", Icon);
  console.log("Icon type:", typeof Icon);

  return (
    <View style={[styles.container, { backgroundColor: theme.accentGrayAlt }]}>
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
    </View>
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
