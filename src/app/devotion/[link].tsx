import NoteEditor from "@/components/NoteEditor";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function DevotionPage() {
  const { link, title } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen
        options={{
          title: title?.toString() || "Devotion",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Text>Devotion Page for link: {link}</Text>
      <NoteEditor />
    </View>
  );
}
