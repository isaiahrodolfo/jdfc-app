import Input from "@/components/miscellaneous/Input";
import LessonCategoryCard from "@/components/miscellaneous/LessonCategoryCard";
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

export default function Lessons() {
  const { user } = useAuthContext();
  const { theme, fonts } = useTheme();
  const { refreshPage } = useTabs();

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

  const routeToLessons = (page: string) => {};

  const routeToSermons = (page: string) => {};

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
        <View style={styles.lessonCategoriesContainer}>
          <LessonCategoryCard
            color={theme.sundayService}
            titleHeading={"Sunday Service"}
            onPress={() => routeToSermons("sundayService")}
          />
          <LessonCategoryCard
            color={theme.prayerService}
            titleHeading={"Prayer Service"}
            onPress={() => routeToSermons("prayerService")}
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
    gap: 36,
  },
  h1: {
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingBottom: 12,
  },
  lessonCategoriesContainer: {
    gap: 16,
    // paddingRight: 24,
  },
});
