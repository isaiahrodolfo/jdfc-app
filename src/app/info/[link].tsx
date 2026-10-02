import InfoPage from "@/components/pages/InfoPage";
import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function InfoPageWrapper() {
  const { title, subtitle, category, timestamp, location, information } =
    useLocalSearchParams();
  const { theme } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.primary }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerShown: true,
            headerBackButtonDisplayMode: "minimal", // Circle back button
            headerTransparent: true,
          }}
        />
        <InfoPage
          title={title.toString()}
          subtitle={subtitle ? subtitle.toString() : undefined}
          category={category ? category.toString() : undefined}
          timestamp={timestamp ? new Date(timestamp.toString()) : undefined}
          location={location ? location.toString() : undefined}
          information={information ? information.toString() : undefined}
          colorName="yellow"
        >
          <Text>Children</Text>
        </InfoPage>
      </View>
    </ScrollView>
  );
}
