import { Text, View } from "react-native";

type CheckboxProps = {
  isChecked: boolean;
  isCurrent: boolean;
};

export default function Checkbox({
  isChecked,
  isCurrent = false,
}: CheckboxProps) {
  return (
    <View>
      <Text>Checkbox is checked? {isChecked.toString()}</Text>
      <Text>Checkbox is current? {isCurrent.toString()}</Text>
    </View>
  );
}
