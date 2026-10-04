import {
  ChurchLesson,
  getChurchLessons,
} from "@/api/supabase/lessons/getChurchLessons";
import SermonCard from "@/components/cards/SermonCard";
import { useTheme } from "@/contexts/ThemeContext";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const { seriesId } = useLocalSearchParams();
  const { theme, fonts } = useTheme();

  const [sermons, setSermons] = useState<ChurchLesson[]>([]);

  useEffect(() => {
    async function fetchSeries() {
      const sermonsData = await getChurchLessons(Number(seriesId));
      setSermons(sermonsData);
    }

    fetchSeries();
  }, [seriesId]);

  const routeToLessonPage = (lessonId: number) => {
    router.push({
      pathname: "/lesson/[lessonId]",
      params: {
        lessonId,
      },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <View style={styles.sermonsListContainer}>
        {sermons.map((sermon) => (
          <SermonCard
            color={"blue"}
            size={"big"}
            descriptionHeading={""}
            titleHeading={sermon.title ?? ""}
            onLessonPress={() => {
              routeToLessonPage(sermon.lessonId);
            }}
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
