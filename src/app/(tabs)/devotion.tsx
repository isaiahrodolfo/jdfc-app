import { toggleCompleted } from "@/api/supabase/lessons/toggleCompleted";
import LessonCard from "@/components/cards/LessonCard";
import { dateFormatter } from "@/components/helpers/dateFormatter";
import { dateKeyToLocalDate } from "@/components/helpers/dateKeyToLocalDate";
import { handleDevotionalPress } from "@/components/helpers/handleDevotionalPress";
import ProgressTrackerCard from "@/components/progress_tracker/ProgressTrackerCard";
import { useTabs } from "@/contexts/TabsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useRef, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Devotion() {
  const { user } = useAuthContext();
  const { theme, fonts } = useTheme();
  const {
    devotionals,
    setDevotionals,
    devotionalsProgress,
    todaysDate,
    refreshPage,
  } = useTabs();

  const [refreshing, setRefreshing] = useState(false);

  const pendingCompletionUpdates = useRef(
    new Map<
      number,
      { desired: boolean; persisted: boolean; revision: number }
    >(),
  );

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await refreshPage();
    } finally {
      setRefreshing(false);
    }
  };

  const handleCheckboxPress = async (lessonId: number) => {
    // Get the devotion to toggle its completion
    const devotional = devotionals.find(
      (devotional) => devotional.lessonId === lessonId,
    );

    if (!devotional) return;

    const pendingUpdate = pendingCompletionUpdates.current.get(lessonId);
    const newIsChecked = !(pendingUpdate?.desired ?? devotional.isCompleted);
    const update = pendingUpdate ?? {
      desired: newIsChecked,
      persisted: devotional.isCompleted,
      revision: 0,
    };

    update.desired = newIsChecked;
    update.revision += 1;
    pendingCompletionUpdates.current.set(lessonId, update);

    // Set the devotionals object right away
    setDevotionals((prev) =>
      prev.map((devotional) =>
        devotional.lessonId === lessonId
          ? { ...devotional, isCompleted: newIsChecked }
          : devotional,
      ),
    );

    if (pendingUpdate) return;

    try {
      while (update.desired !== update.persisted) {
        const valueToPersist = update.desired;
        const revisionToPersist = update.revision;

        try {
          await toggleCompleted(user.id, lessonId, valueToPersist);
          update.persisted = valueToPersist;
        } catch (error) {
          console.error("Error updating completion:", error);

          if (update.revision === revisionToPersist) {
            setDevotionals((prev) =>
              prev.map((devotional) =>
                devotional.lessonId === lessonId
                  ? { ...devotional, isCompleted: update.persisted }
                  : devotional,
              ),
            );
            break;
          }
        }
      }
    } finally {
      pendingCompletionUpdates.current.delete(lessonId);
    }
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
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={theme.iconPrimary}
        />
      }
    >
      <View style={styles.container}>
        <Text
          style={[
            styles.h1,
            {
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h1,
              color: theme.textH1,
            },
          ]}
        >
          Devotion
        </Text>
        <ProgressTrackerCard
          colorName="yellow"
          checkmarkColor={theme.primary}
          progressTrackerData={[
            {
              checkboxesData: devotionalsProgress,
              subtitles: ["% completed this year"],
            },
          ]}
        />
        {devotionals
          .filter((devotional) => {
            const devotionalDate = dateKeyToLocalDate(devotional.dateKey);

            return devotionalDate <= todaysDate;
          })
          .toReversed()
          .map((devotional) => {
            const devotionalDate = dateKeyToLocalDate(devotional.dateKey);

            const yesterday = new Date(todaysDate);
            yesterday.setDate(yesterday.getDate() - 1);

            const isToday = devotionalDate.getTime() === todaysDate.getTime();
            const isYesterday =
              devotionalDate.getTime() === yesterday.getTime();

            const size = isToday || isYesterday ? "big" : "medium";

            return (
              <LessonCard
                key={devotional.dateKey}
                isUserCompletable={true}
                isCompleted={devotional.isCompleted}
                titleHeading={devotional.title || "No Devotional Today"}
                descriptionHeading="Daily Devotion"
                descriptionSubheading={
                  isToday
                    ? "Today"
                    : isYesterday
                      ? "Yesterday"
                      : dateFormatter("date").format(devotionalDate)
                }
                size={size}
                colorName="yellow"
                imageLink={devotional.imageUrl}
                onCheckboxPress={() => handleCheckboxPress(devotional.lessonId)}
                onLessonPress={() => handleDevotionalPress(devotional)}
              />
            );
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 36,
  },
  h1: {
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingBottom: 12,
  },
});
