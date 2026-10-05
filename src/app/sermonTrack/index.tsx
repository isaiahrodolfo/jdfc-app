import { getSeries, Series } from "@/api/supabase/lessons/getSeries";
import LessonCategoryCard from "@/components/miscellaneous/LessonCategoryCard";
import { useTheme } from "@/contexts/ThemeContext";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ColorValue, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { trackId, color } = useLocalSearchParams();
  const { theme, fonts } = useTheme();

  const [seriesList, setSeriesList] = useState<Series[]>([]);

  console.log(trackId, color);

  useEffect(() => {
    async function fetchSeries() {
      const seriesData = await getSeries(Number(trackId));
      setSeriesList(seriesData);
    }

    fetchSeries();
  }, [trackId]);

  const routeToLessonsPage = (seriesId: number) => {
    router.push({
      pathname: "/sermonTrack/sermonSeries",
      params: {
        seriesId,
      },
    });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.primary }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 96,
        paddingBottom: 96,
        paddingHorizontal: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerShown: true,
            headerBackButtonDisplayMode: "minimal", // Circle back button
            headerTransparent: true,
          }}
        />
        <Text
          style={[
            styles.h1,
            {
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h1,
              color:
                Number(trackId) === 1
                  ? theme.sundayService
                  : theme.prayerService,
            },
          ]}
        >
          {Number(trackId) === 1 ? "Sunday Sermons" : "Prayer Service Sermons"}
        </Text>
        <View style={styles.sermonsListContainer}>
          {seriesList.map((series) => (
            <LessonCategoryCard
              color={color as ColorValue}
              titleHeading={series.name ?? ""}
              onPress={() => {
                console.log(series.series_number);
                routeToLessonsPage(series.id);
              }}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { top: 64, gap: 36 },
  sermonsListContainer: { gap: 20, paddingRight: 8 },
  h1: {
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingBottom: 4,
  },
});
