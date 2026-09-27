import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet, Text, View } from "react-native";

type ButtonBigProps = {
  icon: React.ComponentType;
  text: string;
};

export default function ButtonBig({ icon: Icon, text }: ButtonBigProps) {
  const { theme, fonts } = useTheme();

  console.log("Icon:", Icon);
  console.log("Icon type:", typeof Icon);

  return (
    <View style={[styles.container, { backgroundColor: theme.iconPrimary }]}>
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
    </View>
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
