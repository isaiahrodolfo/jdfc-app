import EventCardBig from "@/components/cards/EventCardBig";
import { dateFormatter } from "@/components/helpers/dateFormatter";
import Input from "@/components/miscellaneous/Input";
import LessonCategoryCard from "@/components/miscellaneous/LessonCategoryCard";
import { useTabs } from "@/contexts/TabsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuthContext } from "@/hooks/use-auth-context";
import { router } from "expo-router";
import { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Lessons() {
  const { user } = useAuthContext();
  const { theme, fonts } = useTheme();
  const { recentLiveEventLessons, refreshPage } = useTabs();

  const [searchQuery, setSearchQuery] = useState("");

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

  const routeToLessons = (track: string) => {};

  const routeToSermons = (
    track: "sundayService" | "prayerService",
    trackNumber: number,
  ) => {
    router.push({
      pathname: "/sermons",
      params: {
        trackNumber: trackNumber,
        color: theme[track],
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
          Lessons
        </Text>
        <Input
          value={searchQuery}
          placeholderText="Search..."
          autoComplete="off"
          textColor={theme.text}
          borderColor={theme.iconSecondary}
          placeholderTextColor={theme.iconSecondary}
          onChangeText={(text) => setSearchQuery(text)}
        />
        {/* Recent */}
        <Text
          style={[
            styles.h2,
            {
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h2,
              color: theme.textH2,
            },
          ]}
        >
          Recent
        </Text>
        <View style={styles.recentLiveEventLessonContainer}>
          {recentLiveEventLessons.map((recentLiveEventLesson) => {
            const date = new Date(recentLiveEventLesson.timestamp);
            return (
              <EventCardBig
                title={recentLiveEventLesson.title}
                subtitle={dateFormatter("date").format(date)}
                livestreamLink={recentLiveEventLesson.livestream_link}
              />
            );
          })}
        </View>
        {/* Categories */}
        <Text
          style={[
            styles.h2,
            {
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h2,
              color: theme.textH2,
            },
          ]}
        >
          Categories
        </Text>
        <View style={styles.lessonCategoriesContainer}>
          <LessonCategoryCard
            color={theme.sundayService}
            titleHeading={"Sunday Service"}
            onPress={() => routeToSermons("sundayService", 1)}
          />
          <LessonCategoryCard
            color={theme.prayerService}
            titleHeading={"Prayer Service"}
            onPress={() => routeToSermons("prayerService", 2)}
          />
          <LessonCategoryCard
            color={theme.blue}
            titleHeading={"Consolidation"}
            onPress={() => routeToLessons("consolidation")}
          />
          <LessonCategoryCard
            color={theme.green}
            titleHeading={"Life Class"}
            onPress={() => routeToLessons("lifeClass")}
          />
          <LessonCategoryCard
            color={theme.purple}
            titleHeading={"Destiny Training"}
            onPress={() => routeToLessons("destinyTraining")}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  h1: {
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingBottom: 12 + 16,
  },
  h2: {
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingTop: 12,
  },
  recentLiveEventLessonContainer: {
    gap: 28,
  },
  lessonCategoriesContainer: {
    gap: 16,
    paddingRight: 96,
  },
});
