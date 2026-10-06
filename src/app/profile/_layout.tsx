import { TabsProvider } from "@/contexts/TabsContext";
import { Stack } from "expo-router";

export default function ProfilePreviewLayout() {
  return (
    <TabsProvider>
      <Stack>
        <Stack.Screen
          name="[userId]"
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
