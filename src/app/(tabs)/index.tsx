import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AnnouncementCard from "@/components/cards/AnnouncementCard";
import EventCardBig from "@/components/cards/EventCardBig";
import EventCardSmall from "@/components/cards/EventCardSmall";
import { useTabs } from "@/contexts/TabsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";

export default function Home() {
  const { theme, fonts } = useTheme();
  const { announcements, liveEvents, upcomingEvents, refreshHomePage } =
    useTabs();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await refreshHomePage();
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

        {announcements.map((announcement) => (
          <AnnouncementCard
            key={announcement.name}
            title={announcement.name}
            subtitle={announcement.category}
            // colorName={announcement.color as "accent" | "accentAlt"}
            colorName={"accent"}
          />
        ))}

        {/* Upcoming Events */}
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

        {upcomingEvents.map((upcomingEvent) => (
          <EventCardSmall
            key={upcomingEvent.title}
            title={upcomingEvent.title}
            location={upcomingEvent.location}
            date={upcomingEvent.date}
            colorName={"prayerService"}
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
