import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function PassagePage() {
  const { passage } = useLocalSearchParams();
  return (
    <View>
      <Text>{passage}</Text>
    </View>
  );
}
