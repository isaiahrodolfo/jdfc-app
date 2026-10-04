import { getSeries, Series } from "@/api/supabase/lessons/getSeries";
import LessonCategoryCard from "@/components/miscellaneous/LessonCategoryCard";
import { useTheme } from "@/contexts/ThemeContext";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ColorValue, ScrollView, StyleSheet, View } from "react-native";

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
  container: {},
  sermonsListContainer: {},
});
