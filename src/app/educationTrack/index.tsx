import {
  EducationTrack,
  getEducationLessons,
} from "@/api/supabase/lessons/getEducationLessons";
import { toggleCompleted } from "@/api/supabase/lessons/toggleCompleted";
import LessonCard from "@/components/cards/LessonCard";
import { dateFormatter } from "@/components/helpers/dateFormatter";
import DropdownSmall from "@/components/miscellaneous/DropdownSmall";
import ProgressTrackerCard, {
  ProgressTrackerData,
} from "@/components/progress_tracker/ProgressTrackerCard";
import { AccentColor } from "@/constants/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuthContext } from "@/hooks/use-auth-context";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { user } = useAuthContext();
  const { trackId, colorName } = useLocalSearchParams();
  const { theme, fonts } = useTheme();

  const [educationTrack, setEducationTrack] = useState<EducationTrack | null>(
    null,
  );
  const [selectedSeriesIndex, setSelectedSeriesIndex] = useState(0);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const pendingLessonIds = useRef(new Set<number>());

  const accentColor = colorName?.toString() as AccentColor;

  const selectedSeries = educationTrack?.seriesLessons[selectedSeriesIndex];

  const trackProgress: ProgressTrackerData = {
    checkboxesData:
      educationTrack?.seriesLessons.flatMap((series) =>
        series.lessons.map((lesson) => ({
          date: (series.seriesNumber ?? 0) * 10000 + (lesson.lessonNumber ?? 0),
          isChecked: lesson.isCompleted ?? false,
          isCurrent: false,
        })),
      ) ?? [],

    // subtitles: [""],
    // educationTrack?.seriesLessons.flatMap((series) =>
    //   series.lessons.map((lesson) => lesson.title ?? ""),
    // ) ?? [],
  };

  const seriesProgress: ProgressTrackerData = {
    checkboxesData:
      selectedSeries?.lessons.map((lesson) => ({
        date: lesson.lessonNumber ?? 0,
        isChecked: lesson.isCompleted ?? false,
        isCurrent: false,
      })) ?? [],

    // subtitles: [""],
    // selectedSeries?.lessons.map((lesson) => lesson.title ?? "") ?? [],
  };

  const progressTrackerData: ProgressTrackerData[] = [
    seriesProgress,
    // trackProgress,
  ];

  console.log(progressTrackerData);

  useEffect(() => {
    const userId = user?.id;

    if (!userId || !trackId) {
      return;
    }

    async function fetchEducationTrack() {
      const educationTrackData = await getEducationLessons(
        Number(trackId),
        userId,
      );

      setEducationTrack(educationTrackData);
      setSelectedSeriesIndex(0);
    }

    fetchEducationTrack();
  }, [user?.id, trackId]);

  const routeToLessonsPage = (lessonId: number) => {
    router.push({
      pathname: "/lesson/[lessonId]",
      params: {
        lessonId,
      },
    });
  };

  const handleClosePress = (selectedIndex: number) => {
    setSelectedSeriesIndex(selectedIndex);
    setDropdownIsOpen(false);
  };

  const handleCheckboxPress = async (lessonId: number) => {
    const userId = user?.id;

    if (!userId || pendingLessonIds.current.has(lessonId)) {
      return;
    }

    const lesson = selectedSeries?.lessons.find(
      (lesson) => lesson.lessonId === lessonId,
    );

    if (!lesson) {
      return;
    }

    const previousIsCompleted = lesson.isCompleted ?? false;
    const newIsCompleted = !previousIsCompleted;

    pendingLessonIds.current.add(lessonId);

    // Optimistically update the UI immediately.
    setEducationTrack((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        seriesLessons: prev.seriesLessons.map((series, seriesIndex) => {
          if (seriesIndex !== selectedSeriesIndex) {
            return series;
          }

          return {
            ...series,
            lessons: series.lessons.map((lesson) =>
              lesson.lessonId === lessonId
                ? {
                    ...lesson,
                    isCompleted: newIsCompleted,
                  }
                : lesson,
            ),
          };
        }),
      };
    });

    try {
      await toggleCompleted(userId, lessonId, newIsCompleted);
    } catch (error) {
      console.error("Error updating completion:", error);

      // Revert to the exact previous value.
      setEducationTrack((prev) => {
        if (!prev) {
          return prev;
        }

        return {
          ...prev,
          seriesLessons: prev.seriesLessons.map((series, seriesIndex) => {
            if (seriesIndex !== selectedSeriesIndex) {
              return series;
            }

            return {
              ...series,
              lessons: series.lessons.map((lesson) =>
                lesson.lessonId === lessonId
                  ? {
                      ...lesson,
                      isCompleted: previousIsCompleted,
                    }
                  : lesson,
              ),
            };
          }),
        };
      });
    } finally {
      pendingLessonIds.current.delete(lessonId);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.primary,
      }}
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
            headerBackButtonDisplayMode: "minimal",
            headerTransparent: true,
          }}
        />

        <Text
          style={[
            styles.h1,
            {
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h1,
              color: theme[accentColor],
            },
          ]}
        >
          {educationTrack?.trackName}
        </Text>

        <ProgressTrackerCard
          colorName={accentColor}
          progressTrackerData={progressTrackerData}
        />

        <DropdownSmall
          selections={
            educationTrack?.seriesLessons.map(
              (series) =>
                `${educationTrack.heading} ${series.seriesNumber}: ${series.name}`,
            ) ?? []
          }
          isOpen={dropdownIsOpen}
          indexSelected={selectedSeriesIndex}
          onOpenPress={() => setDropdownIsOpen(true)}
          onClosePress={handleClosePress}
        />

        <View style={styles.lessonsListContainer}>
          {selectedSeries?.lessons.map((lesson) => {
            const lessonDate = lesson.timestamp
              ? new Date(lesson.timestamp)
              : null;

            const today = new Date();

            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            const isValidDate =
              lessonDate !== null && !Number.isNaN(lessonDate.getTime());

            const isToday =
              isValidDate &&
              lessonDate.getUTCFullYear() === today.getFullYear() &&
              lessonDate.getUTCMonth() === today.getMonth() &&
              lessonDate.getUTCDate() === today.getDate();

            const isYesterday =
              isValidDate &&
              lessonDate.getUTCFullYear() === yesterday.getFullYear() &&
              lessonDate.getUTCMonth() === yesterday.getMonth() &&
              lessonDate.getUTCDate() === yesterday.getDate();

            const size = isToday || isYesterday ? "medium" : "small";

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
                isUserCompletable={lesson.isUserCompletable ?? false}
                isCompleted={lesson.isCompleted ?? false}
                colorName={accentColor}
                size={size}
                descriptionSubheading={
                  isToday || isYesterday ? "" : lessonDateString
                }
                descriptionHeading={
                  isToday ? "Today" : isYesterday ? "Yesterday" : ""
                }
                titleHeading={lesson.title ?? ""}
                onCheckboxPress={() => handleCheckboxPress(lesson.lessonId)}
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
  container: {
    top: 64,
    gap: 36,
  },
  lessonsListContainer: {
    gap: 20,
    paddingRight: 8,
  },
  h1: {
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingBottom: 4,
  },
});
