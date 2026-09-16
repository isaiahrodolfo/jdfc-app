import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* The main tab group */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Individual screens outside the tab structure */}
      <Stack.Screen name="sermons" options={{ headerShown: true }} />
      <Stack.Screen name="devotion" options={{ headerShown: true }} />
    </Stack>
  );
}
