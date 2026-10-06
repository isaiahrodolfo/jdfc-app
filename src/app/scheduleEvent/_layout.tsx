import { TabsProvider } from "@/contexts/TabsContext";
import { Stack } from "expo-router";

export default function ScheduleEventLayout() {
  return (
    <TabsProvider>
      <Stack>
        <Stack.Screen
          name="index"
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
