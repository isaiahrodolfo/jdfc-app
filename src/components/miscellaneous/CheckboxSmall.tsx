import { Octicons } from "@react-native-vector-icons/octicons";
import { ColorValue, Pressable, StyleSheet } from "react-native";

type CheckboxSmallProps = {
  backgroundColor: ColorValue;
  checkboxColor: ColorValue;
  borderColor: ColorValue;
  checkColor: ColorValue;
  isEditable?: boolean;
  isChecked: boolean;
  onCheckboxPress: () => void;
};

export default function CheckboxSmall({
  backgroundColor,
  checkboxColor,
  borderColor,
  checkColor,
  isEditable = true,
  isChecked,
  onCheckboxPress,
}: CheckboxSmallProps) {
  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: isChecked ? checkboxColor : backgroundColor,
          borderColor: borderColor,
        },
      ]}
      onPress={() => {
        if (isEditable) {
          onCheckboxPress();
        }
      }}
    >
      {isChecked && <Octicons name="check" color={checkColor} size={16} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
