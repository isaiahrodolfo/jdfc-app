import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function EditProfilePage() {
  const { userId } = useLocalSearchParams();
  return (
    <View>
      <Text>{userId}</Text>
    </View>
  );
}
