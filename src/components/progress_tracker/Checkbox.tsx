import { AccentColor } from "@/constants/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { Pressable, StyleSheet, View } from "react-native";
import CheckmarkIndigo1 from "../../../assets/icons/CheckmarkIndigo1.svg";

type CheckboxProps = {
  isChecked: boolean;
  colorName: AccentColor;
  type: "Primary" | "Secondary";
  isCurrent: boolean;
};

export default function Checkbox({
  isChecked,
  colorName,
  type,
  isCurrent = false,
}: CheckboxProps) {
  const { theme } = useTheme();

  // Dynamically determine the color token key
  const stateSuffix = isChecked ? "Enabled" : "Disabled";

  // By using `as const`, themeKey becomes type: 'yellowPrimaryEnabled' | 'blueSecondaryDisabled' etc.
  const themeKey = `${colorName}${type}${stateSuffix}` as const;
  const borderThemeKey = `${colorName}SecondaryDisabled` as const;

  console.log(themeKey);

  return (
    // Pass the evaluated themeKey variable inside brackets
    <View style={styles.container}>
      <Pressable
        style={[
          styles.circleContainer,
          {
            backgroundColor: theme[themeKey],
            borderColor: isCurrent ? theme[borderThemeKey] : "",
            borderWidth: isCurrent ? 3 : 0,
          },
        ]}
      >
        <View>{isChecked ? <CheckmarkIndigo1 /> : <View></View>}</View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  circleContainer: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
