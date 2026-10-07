import PreviewTitleCard from "@/components/cards/PreviewTitleCard";
import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function InfoPageWrapper() {
  const {
    eventTypeId,
    title,
    subtitle,
    category,
    timestamp,
    location,
    information,
  } = useLocalSearchParams();
  const { theme, fonts } = useTheme();

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
        <View style={{ height: "100%" }}>
          <PreviewTitleCard
            eventTypeId={Number(eventTypeId.toString())}
            title={title ? title.toString() : ""}
            subtitle={subtitle ? subtitle.toString() : undefined}
            category={category ? category.toString() : undefined}
            timestamp={timestamp ? new Date(timestamp.toString()) : undefined}
            location={location ? location.toString() : undefined}
          />

          <View style={[styles.container, { top: 192 }]}>
            <View style={styles.informationContainer}>
              {/* Information */}
              <Text
                style={[
                  styles.h2,
                  {
                    fontFamily: fonts.family,
                    fontSize: fonts.sizes.h2,
                    color: theme.textAlt,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  },
                ]}
              >
                Information
              </Text>
              <View
                style={[
                  styles.informationTextContainer,
                  { backgroundColor: theme.secondary },
                ]}
              >
                <Text
                  style={{
                    fontFamily: fonts.family,
                    fontSize: fonts.sizes.h6,
                    color: theme.textAlt,
                  }}
                >
                  {information}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 36,
    paddingTop: 36,
  },
  h2: {},
  informationContainer: {
    gap: 16,
  },
  informationTextContainer: {
    padding: 20,
  },
});
