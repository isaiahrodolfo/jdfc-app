import { TabsProvider } from "@/contexts/TabsContext";
import { Stack } from "expo-router";

export default function DevotionLayout() {
  return (
    <TabsProvider>
      <Stack>
        <Stack.Screen
          name="[link]"
          options={{
            headerTitle: "",
            headerShown: true,
            headerBackButtonDisplayMode: "minimal", // Circle back button
            headerTransparent: true,
          }}
        />
      </Stack>
    </TabsProvider>
  );
}
