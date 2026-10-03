import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Devotional } from "@/api/supabase/our_daily_bread/odb_api";
import AnnouncementCard from "@/components/cards/AnnouncementCard";
import EventCardBig from "@/components/cards/EventCardBig";
import EventCardSmall from "@/components/cards/EventCardSmall";
import LessonCard from "@/components/cards/LessonCard";
import { useTabs } from "@/contexts/TabsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { router } from "expo-router";
import { useState } from "react";

export default function Home() {
  const { theme, fonts } = useTheme();
  const {
    announcements,
    liveEvents,
    upcomingEvents,
    todaysDevotional,
    refreshPage,
  } = useTabs();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await refreshPage();
    } finally {
      setRefreshing(false);
    }
  };

  const handleDevotionalPress = (devotional: Devotional) => {
    // Navigate to a detailed view
    router.push({
      pathname: "/devotional/[link]",
      params: {
        link: devotional.odbUrl,
        title: devotional.title,
        dateKey: devotional.dateKey,
      },
    });
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
          Home
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
          Live
        </Text>

        {liveEvents.map((liveEvent) => (
          <EventCardBig
            title={liveEvent.title}
            subtitle={""}
            livestreamLink={liveEvent.livestream_link}
          />
        ))}

        {/* Announcements */}
        {announcements && (
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
            Announcements
          </Text>
        )}

        {announcements.map((announcement) => (
          <AnnouncementCard
            key={announcement.name}
            title={announcement.name}
            category={announcement.category}
            // colorName={announcement.color as "accent" | "accentAlt"}
            colorName={"accent"}
            onIconPress={() =>
              handleInfoPress({
                title: announcement.name || "No Title",
                category: "Announcement",
                subtitle: announcement.category || "No Category",
                information: announcement.information || "",
              })
            }
          />
        ))}

        {/* Today */}
        {todaysDevotional && (
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
            Today
          </Text>
        )}

        {todaysDevotional && (
          <LessonCard
            isCompleted={false}
            titleHeading={todaysDevotional?.title || "No Devotional Today"}
            descriptionHeading={"Daily Devotion"}
            size="big"
            colorName="yellow"
            onLessonPress={() => handleDevotionalPress(todaysDevotional)}
          />
        )}

        {/* Upcoming Events */}
        {upcomingEvents && (
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
        )}

        {upcomingEvents.map((upcomingEvent) => (
          <EventCardSmall
            key={upcomingEvent.title}
            title={upcomingEvent.title}
            location={upcomingEvent.location}
            date={upcomingEvent.date}
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
});
