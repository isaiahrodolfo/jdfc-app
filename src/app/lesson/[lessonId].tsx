import { getLesson, Lesson } from "@/api/supabase/lessons/getLesson";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { lessonId } = useLocalSearchParams();
  const { theme, fonts } = useTheme();

  const [lesson, setLesson] = useState<Lesson>();

  useEffect(() => {
    async function fetchSeries() {
      const lessonData = await getLesson(Number(lessonId));
      setLesson(lessonData);
    }

    fetchSeries();
  }, [lessonId]);

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <Text>{lesson?.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  sermonsListContainer: {},
});
