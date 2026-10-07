import { AccentColor } from "@/constants/theme";
import { useTheme } from "@/contexts/ThemeContext";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { ColorValue, Pressable, StyleSheet, View } from "react-native";

type CheckboxProps = {
  isChecked: boolean;
  colorName: AccentColor;
  type: "Primary" | "Secondary";
  isCurrent: boolean;
  checkmarkColor: ColorValue;
  onCheckboxPress: () => void;
};

export default function Checkbox({
  isChecked,
  colorName,
  type,
  isCurrent = false,
  checkmarkColor,
  onCheckboxPress,
}: CheckboxProps) {
  const { theme } = useTheme();

  // Dynamically determine the color token key
  const stateSuffix = isChecked ? "Enabled" : "Disabled";

  // By using `as const`, themeKey becomes type: 'yellowPrimaryEnabled' | 'blueSecondaryDisabled' etc.
  const themeKey = `${colorName}${type}${stateSuffix}` as const;
  const borderThemeKey = `${colorName}SecondaryDisabled` as const;

  // console.log(themeKey);

  return (
    // Pass the evaluated themeKey variable inside brackets
    <Pressable style={styles.container} onPress={onCheckboxPress}>
      <View
        style={[
          styles.circleContainer,
          {
            backgroundColor: theme[themeKey],
            borderColor: isCurrent ? theme[borderThemeKey] : "",
            borderWidth: isCurrent ? 3 : 0,
          },
        ]}
      >
        <View>
          {isChecked && (
            <FontAwesome6
              name="check"
              color={checkmarkColor}
              size={20}
              iconStyle="solid"
            />
          )}
        </View>
      </View>
    </Pressable>
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
