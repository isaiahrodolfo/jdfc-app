import { ColorValue, Pressable, StyleSheet, Text } from "react-native";

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
      {isChecked && <Text style={{ color: checkColor }}>X</Text>}
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
