import {
  ChurchLesson,
  getChurchLessons,
} from "@/api/supabase/lessons/getChurchLessons";
import SermonCard from "@/components/cards/SermonCard";
import { useTheme } from "@/contexts/ThemeContext";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

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
      <View style={[styles.container, { backgroundColor: theme.primary }]}>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerShown: true,
            headerBackButtonDisplayMode: "minimal", // Circle back button
            headerTransparent: true,
          }}
        />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  sermonsListContainer: {},
});
