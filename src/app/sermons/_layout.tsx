import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Sermons" }} />
      <Stack.Screen
        name="[id]"
        options={({ route }) => ({
          title: route.params?.title || "Default Title",
        })}
      />
    </Stack>
  );
}
