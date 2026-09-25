import { Text, View } from "react-native";

type Checkbox = {
  isChecked: boolean;
};

export default function Checkbox({ isChecked }: { isChecked: boolean }) {
  return (
    <View>
      <Text>Checkbox is checked? {isChecked.toString()}</Text>
    </View>
  );
}
