import EventCardSmall from "@/components/cards/EventCardSmall";
import { useTabs } from "@/contexts/TabsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { router } from "expo-router";
import { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function LifeGroup() {
  const { theme, fonts } = useTheme();
  const { upcomingEvents, refreshPage } = useTabs();

  const upcomingLifeGroupEvents = upcomingEvents.filter(
    (upcomingEvent) => upcomingEvent.title === "Life Group",
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await refreshPage();
    } finally {
      setRefreshing(false);
    }
  };

  const handleInfoPress = ({
    title,
    subtitle,
    category,
    timestamp,
    location,
    information,
  }: {
    title: string;
    subtitle?: string;
    category?: string;
    timestamp?: Date;
    location?: string;
    information?: string;
  }) => {
    // Navigate to a detailed view
    router.push({
      pathname: "/info/[link]",
      params: {
        link: title.toLowerCase().replace(/\s+/g, "-"), // Example: convert title to a URL-friendly format
        title: title,
        subtitle: subtitle,
        category: category,
        timestamp: timestamp?.toISOString(),
        location: location,
        information: information,
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
          Life Group
        </Text>
        {/* Live Events */}
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
          Upcoming Events
        </Text>
        {upcomingLifeGroupEvents?.map((upcomingEvent) => (
          <EventCardSmall
            title={"Life Group"}
            date={upcomingEvent.date}
            location={upcomingEvent.location}
            onInfoPress={() =>
              handleInfoPress({
                title: upcomingEvent.title,
                timestamp: upcomingEvent.date,
                location: upcomingEvent.location,
                information: upcomingEvent.information,
                category: "Event",
              })
            }
          />
        ))}
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
    paddingBottom: 4,
  },
  h2: {
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingTop: 20,
  },
  recentLiveEventLessonContainer: {
    gap: 28,
  },
  lessonCategoriesContainer: {
    gap: 16,
    paddingRight: 96,
  },
});
