import { useTabs } from "@/contexts/TabsContext";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function DevotionPage() {
  const { user } = useAuthContext();
  const { link, title, dateKey } = useLocalSearchParams();
  const { devotionals } = useTabs();

  const devotional =
    devotionals.find((devotional) => devotional.dateKey === dateKey) ?? null;

  return (
    <View style={{ flex: 1 }}>
      <Text>{devotional?.title}</Text>
    </View>
  );
}
