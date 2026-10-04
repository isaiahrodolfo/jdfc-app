import { getLesson, Lesson } from "@/api/supabase/lessons/getLesson";
import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

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
        <Text>{lesson?.id}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  sermonsListContainer: {},
});
