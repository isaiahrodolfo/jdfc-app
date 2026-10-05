import {
  EducationTrack,
  getEducationLessons,
  SeriesLessons,
} from "@/api/supabase/lessons/getEducationLessons";
import LessonCard from "@/components/cards/LessonCard";
import { dateFormatter } from "@/components/helpers/dateFormatter";
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
          {selectedSeries?.lessons.map((lesson) => {
            const lessonDate = lesson.timestamp
              ? new Date(lesson.timestamp)
              : null;

            const today = new Date();

            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            const isToday =
              lessonDate !== null &&
              lessonDate.getUTCFullYear() === today.getFullYear() &&
              lessonDate.getUTCMonth() === today.getMonth() &&
              lessonDate.getUTCDate() === today.getDate();

            const isYesterday =
              lessonDate !== null &&
              lessonDate.getUTCFullYear() === yesterday.getFullYear() &&
              lessonDate.getUTCMonth() === yesterday.getMonth() &&
              lessonDate.getUTCDate() === yesterday.getDate();

            const size = isToday || isYesterday ? "medium" : "small";

            const isValidDate =
              lessonDate !== null && !Number.isNaN(lessonDate.getTime());

            const lessonDateString = isValidDate
              ? dateFormatter("date").format(
                  new Date(
                    lessonDate.getUTCFullYear(),
                    lessonDate.getUTCMonth(),
                    lessonDate.getUTCDate(),
                  ),
                )
              : "";

            return (
              <LessonCard
                key={lesson.lessonId}
                isCompleted={false}
                colorName={colorName?.toString() as AccentColor}
                size={size}
                descriptionSubheading={
                  isToday
                    ? "Today"
                    : isYesterday
                      ? "Yesterday"
                      : lessonDateString
                }
                titleHeading={lesson.title ?? ""}
                onCheckboxPress={() => {
                  throw new Error("Function not implemented.");
                }}
                onLessonPress={() => routeToLessonsPage(lesson.lessonId)}
              />
            );
          })}
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
