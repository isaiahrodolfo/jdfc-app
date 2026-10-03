import { toggleCompleted } from "@/api/supabase/lessons/toggleCompleted";
import LessonCard from "@/components/cards/LessonCard";
import { dateFormatter } from "@/components/helpers/dateFormatter";
import { handleDevotionalPress } from "@/components/helpers/handleDevotionalPress";
import ProgressTrackerCard from "@/components/progress_tracker/ProgressTrackerCard";
import { useTabs } from "@/contexts/TabsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useState } from "react";
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
    todaysDateKey,
    refreshPage,
  } = useTabs();

  const [refreshing, setRefreshing] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await refreshPage();
    } finally {
      setRefreshing(false);
    }
  };

  const handleCheckboxPress = async (lessonId: number) => {
    if (isUpdating) return;

    // Get the devotion to toggle its completion
    const devotional = devotionals.find(
      (devotional) => devotional.lessonId === lessonId,
    );

    if (!devotional) return;

    const newIsChecked = !devotional.isCompleted;

    // Set the devotionals object right away
    setDevotionals((prev) =>
      prev.map((devotional) =>
        devotional.lessonId === lessonId
          ? { ...devotional, isCompleted: newIsChecked }
          : devotional,
      ),
    );

    setIsUpdating(true);

    try {
      // Set the toggle remotely
      await toggleCompleted(user.id, lessonId, newIsChecked);
    } catch (error) {
      console.error("Error updating completion:", error);

      // Revert the devotionals object if the isCompleted was not saved remotely
      setDevotionals((prev) =>
        prev.map((devotional) =>
          devotional.lessonId === lessonId
            ? { ...devotional, isCompleted: !newIsChecked }
            : devotional,
        ),
      );
    } finally {
      setIsUpdating(false);
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
          progressTrackerData={[
            {
              checkboxesData: devotionalsProgress,
              subtitles: ["% completed this year"],
            },
          ]}
        />
        {devotionals &&
          devotionals
            .filter((devotional) => devotional.dateKey <= todaysDateKey)
            .toReversed()
            .map((devotional) => {
              const yesterdayDate = new Date(todaysDateKey);
              yesterdayDate.setDate(yesterdayDate.getDate() - 1);

              const date = new Date(devotional.dateKey);

              const yesterdayDateKey = yesterdayDate
                .toISOString()
                .split("T")[0];

              const size =
                devotional.dateKey === todaysDateKey ||
                devotional.dateKey === yesterdayDateKey
                  ? "big"
                  : "medium";

              return (
                <LessonCard
                  key={devotional.dateKey}
                  isCompleted={devotional.isCompleted}
                  titleHeading={devotional.title || "No Devotional Today"}
                  descriptionHeading="Daily Devotion"
                  descriptionSubheading={
                    devotional.dateKey === todaysDateKey
                      ? "Today"
                      : devotional.dateKey === yesterdayDateKey
                        ? "Yesterday"
                        : dateFormatter("date").format(date)
                  }
                  size={size}
                  colorName="yellow"
                  imageLink={devotional.imageUrl}
                  onCheckboxPress={() =>
                    handleCheckboxPress(devotional.lessonId)
                  }
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
