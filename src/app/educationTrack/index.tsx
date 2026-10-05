import {
  EducationTrack,
  getEducationLessons,
  SeriesLessons,
} from "@/api/supabase/lessons/getEducationLessons";
import SermonCard from "@/components/cards/SermonCard";
import { useTheme } from "@/contexts/ThemeContext";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ColorValue, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { trackId, color } = useLocalSearchParams();
  const { theme, fonts } = useTheme();

  const [educationTrack, setEducationTrack] = useState<EducationTrack>();
  const [selectedSeries, setSelectedSeries] = useState<SeriesLessons>();

  console.log(trackId, color);

  useEffect(() => {
    async function fetchEducationTrack() {
      const educationTrackData = await getEducationLessons(Number(trackId));
      console.log("educationTrackData", educationTrackData);
      setEducationTrack(educationTrackData);
      console.log(
        "educationTrack?.seriesLessons[0]",
        educationTrack?.seriesLessons[0],
      );
      setSelectedSeries(educationTrackData?.seriesLessons[0]);
    }

    fetchEducationTrack();
  }, [trackId]);

  const routeToLessonsPage = (lessonId: number) => {
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
              color: color as ColorValue,
            },
          ]}
        >
          {educationTrack?.trackName}
        </Text>
        <View style={styles.lessonsListContainer}>
          {selectedSeries?.lessons.map((lesson) => (
            <SermonCard
              color={color as ColorValue}
              size={"big"}
              descriptionHeading={""}
              titleHeading={lesson.title ?? ""}
              onLessonPress={() => {
                routeToLessonsPage(lesson.lessonId);
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
  lessonsListContainer: { gap: 28, paddingRight: 8 },
  h1: {
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingBottom: 4,
  },
});
