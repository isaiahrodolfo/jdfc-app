import LessonCard from "@/components/cards/LessonCard";
import { useTabs } from "@/contexts/TabsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

export default function Devotion() {
  const { theme, fonts } = useTheme();
  const { devotionals, refreshPage } = useTabs();

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
      <View style={styles.container}>
        {devotionals &&
          devotionals.map((devotional) => (
            <LessonCard
              isCompleted={false}
              titleHeading={todaysDevotional?.title || "No Devotional Today"}
              descriptionHeading={"Daily Devotion"}
              size="big"
              colorName="yellow"
              onLessonPress={() => handleDevotionalPress(todaysDevotional)}
            />
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
