import { getSeries, Series } from "@/api/supabase/lessons/getSeries";
import LessonCategoryCard from "@/components/miscellaneous/LessonCategoryCard";
import { useTheme } from "@/contexts/ThemeContext";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ColorValue, StyleSheet, View } from "react-native";

export default function Index() {
  const { trackNumber, color } = useLocalSearchParams();
  const { theme, fonts } = useTheme();

  const [seriesList, setSeriesList] = useState<Series[]>([]);

  console.log(trackNumber, color);

  useEffect(() => {
    async function fetchSeries() {
      const seriesData = await getSeries(Number(trackNumber));
      setSeriesList(seriesData);
    }

    fetchSeries();
  }, [trackNumber]);

  const routeToLessonsPage = (
    seriesId: number,
    seriesNumber: number | null,
  ) => {
    if (!seriesNumber) return;

    router.push({
      pathname: "/sermonTrack/sermonSeries",
      params: {
        seriesId,
      },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <View style={styles.sermonsListContainer}>
        {seriesList.map((series) => (
          <LessonCategoryCard
            color={color as ColorValue}
            titleHeading={series.name ?? ""}
            onPress={() => routeToLessonsPage(series.id, series.series_number)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  sermonsListContainer: {},
});
