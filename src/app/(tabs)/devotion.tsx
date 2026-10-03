import LessonCard from "@/components/cards/LessonCard";
import { dateFormatter } from "@/components/helpers/dateFormatter";
import { handleDevotionalPress } from "@/components/helpers/handleDevotionalPress";
import { useTabs } from "@/contexts/TabsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

export default function Devotion() {
  const { theme, fonts } = useTheme();
  const { devotionals, todaysDateKey, refreshPage } = useTabs();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await refreshPage();
    } finally {
      setRefreshing(false);
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
      {/* <ProgressTrackerCard colorName="yellow" progressTrackerData={} /> */}
      <View style={styles.container}>
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
                  isCompleted={false}
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
                  lessonId={devotional.lessonId}
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
});
