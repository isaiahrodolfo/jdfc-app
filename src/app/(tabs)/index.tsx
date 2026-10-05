import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { toggleCompleted } from "@/api/supabase/lessons/toggleCompleted";
import AnnouncementCard from "@/components/cards/AnnouncementCard";
import EventCardBig from "@/components/cards/EventCardBig";
import EventCardSmall from "@/components/cards/EventCardSmall";
import LessonCard from "@/components/cards/LessonCard";
import { dateKeyToLocalDate } from "@/components/helpers/dateKeyToLocalDate";
import { handleDevotionalPress } from "@/components/helpers/handleDevotionalPress";
import { useTabs } from "@/contexts/TabsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuthContext } from "@/hooks/use-auth-context";
import { router } from "expo-router";
import { useState } from "react";

export default function Home() {
  const { user } = useAuthContext();
  const { theme, fonts } = useTheme();
  const {
    announcements,
    liveEvents,
    upcomingEvents,
    devotionals,
    setDevotionals,
    todaysDate,
    refreshPage,
  } = useTabs();

  const todaysDevotional =
    devotionals.find(
      (devotional) => dateKeyToLocalDate(devotional.dateKey) === todaysDate,
    ) ?? null;

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
    console.log("toggled in devotion page");
    if (isUpdating) return;
    console.log("Setting isUpdating to true");
    setIsUpdating(true);

    const newIsChecked = !devotionals.find(
      (devotional) => devotional.lessonId === lessonId,
    )?.isCompleted;

    // Set the state right away
    setDevotionals((prev) =>
      prev.map((devotional) =>
        devotional.lessonId === lessonId
          ? { ...devotional, isCompleted: newIsChecked }
          : devotional,
      ),
    );

    try {
      // Set the toggle remotely
      console.log(
        "Calling toggleCompleted with:",
        user.id,
        lessonId,
        newIsChecked,
      );
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
      console.log("Setting isUpdating to false");
      setIsUpdating(false);
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
            isUserCompletable={true}
            isCompleted={todaysDevotional.isCompleted}
            titleHeading={todaysDevotional?.title || "No Devotional Today"}
            descriptionHeading={"Daily Devotion"}
            size="big"
            colorName="yellow"
            imageLink={todaysDevotional.imageUrl}
            onCheckboxPress={() =>
              handleCheckboxPress(todaysDevotional.lessonId)
            }
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
