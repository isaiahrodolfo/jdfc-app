import { useAuthContext } from "@/hooks/use-auth-context";
import { Text, View } from "react-native";

export default function FamilyMembersList() {
  const { user } = useAuthContext();

  return (
    <View>
      <Text>{user.id}</Text>
    </View>
  );
}
