import {
  EducationTrack,
  getEducationLessons,
  SeriesLessons,
} from "@/api/supabase/lessons/getEducationLessons";
import LessonCard from "@/components/cards/LessonCard";
import { AccentColor } from "@/constants/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { trackId, colorName } = useLocalSearchParams();
  const { theme, fonts } = useTheme();

  const [educationTrack, setEducationTrack] = useState<EducationTrack>();
  const [selectedSeries, setSelectedSeries] = useState<SeriesLessons>();

  console.log(trackId, colorName);

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
              color: theme[colorName?.toString() as AccentColor],
            },
          ]}
        >
          {educationTrack?.trackName}
          {selectedSeries?.seriesNumber}
        </Text>
        <View style={styles.lessonsListContainer}>
          {selectedSeries?.lessons.map((lesson) => (
            <LessonCard
              isCompleted={false}
              colorName={colorName?.toString() as AccentColor}
              size={"small"}
              descriptionHeading={""}
              titleHeading={lesson.title ?? ""}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { top: 64, gap: 36 },
  lessonsListContainer: { gap: 20, paddingRight: 8 },
  h1: {
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingBottom: 4,
  },
});
