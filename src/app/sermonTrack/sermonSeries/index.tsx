import {
  ChurchLesson,
  getChurchLessons,
} from "@/api/supabase/lessons/getChurchLessons";
import LessonCard from "@/components/cards/LessonCard";
import { useTheme } from "@/contexts/ThemeContext";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const { seriesId } = useLocalSearchParams();
  const { theme, fonts } = useTheme();

  const [sermons, setSermons] = useState<ChurchLesson[]>([]);

  console.log(seriesId);

  useEffect(() => {
    async function fetchSeries() {
      const sermonsData = await getChurchLessons(Number(seriesId));
      setSermons(sermonsData);
    }

    fetchSeries();
  }, [seriesId]);

  const routeToLessonPage = (lessonId: number) => {
    router.push({
      pathname: "/sermonTrack/sermonSeries",
      params: {
        lessonId,
      },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <View style={styles.sermonsListContainer}>
        {sermons.map((sermon) => (
          <LessonCard
            showCheckbox={false}
            isCompleted={false}
            colorName={"blue"}
            size={"big"}
            descriptionHeading={""}
            titleHeading={sermon.title ?? ""}
            onCheckboxPress={function (): void {
              throw new Error("Function not implemented.");
            }}
            onLessonPress={function (): void {
              throw new Error("Function not implemented.");
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
