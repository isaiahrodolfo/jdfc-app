import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
export default function SermonPage() {
  const { id, title } = useLocalSearchParams();

  return (
    <View>
      <Text>Sermon Page</Text>
      <Text>Sermon ID: {id}</Text>
    </View>
  );
}
