import { Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function DescriptionsPage({
  id,
  title,
  handleTakeNotesPress,
}: {
  id: string;
  title: string;
  handleTakeNotesPress: () => void;
}) {
  return (
    <View>
      <Stack.Screen
        options={{
          title: title.toString() || "Default Title",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Text>Sermon Page</Text>
      <Text>Sermon ID: {id}</Text>
      <Pressable onPress={handleTakeNotesPress}>
        <Text>Take Notes</Text>
      </Pressable>
    </View>
  );
}
