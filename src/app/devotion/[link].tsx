import NoteEditor from "@/components/sermons/NoteEditor";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function DevotionPage() {
  const { link, title } = useLocalSearchParams();
  const [devotionData, setDevotionData] = useState("");

  //   useEffect(() => {
  //     fetchDevotions();
  //   }, []);

  return (
    <View>
      <Stack.Screen options={{ title: title.toString() || "Devotion" }} />
      <Text>Devotion Page for link: {link}</Text>
      <NoteEditor />
    </View>
  );
}
