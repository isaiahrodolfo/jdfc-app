import ButtonBig from "@/components/buttons/ButtonBig";
import EventCardSmall from "@/components/cards/EventCardSmall";
import PersonListItem from "@/components/miscellaneous/PersonListItem";
import { useTabs } from "@/contexts/TabsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuthContext } from "@/hooks/use-auth-context";
import Lucide from "@react-native-vector-icons/lucide";
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
  const { user } = useAuthContext();
  const { theme, fonts } = useTheme();
  const { profile, lifeGroupMembers, upcomingEvents, refreshPage } = useTabs();

  // Filter only the user's life group's events
  const upcomingLifeGroupEvents = upcomingEvents
    .filter((upcomingEvent) => upcomingEvent.title === "Life Group")
    .filter(
      (lifeGroupEvent) => lifeGroupEvent.lifeGroupId === profile?.life_group_id,
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
    eventTypeId,
    title,
    subtitle,
    category,
    timestamp,
    location,
    information,
  }: {
    eventTypeId: number;
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
        eventTypeId: eventTypeId ?? -1,
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

  const routeToScheduleEventPage = () => {
    router.push({
      pathname: "/scheduleEvent",
      params: {
        title: "Life Group",
        eventId: "",
        eventTypeIndex: 6,
        lifeGroupId: profile?.life_group_id,
      },
    });
  };

  const routeToProfilePage = (userId: string) => {
    router.push({
      pathname: "/profile/[userId]",
      params: {
        userId,
      },
    });
  };

  const getRole = (roleId: number): string =>
    roleId === 1 ? "Leader" : roleId === 2 ? "Co-leader" : "";

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
            key={upcomingEvent.id}
            eventTypeId={upcomingEvent.eventTypeId ?? -1}
            title={"Life Group"}
            date={upcomingEvent.date}
            location={upcomingEvent.location}
            onInfoPress={() =>
              handleInfoPress({
                eventTypeId: upcomingEvent.eventTypeId ?? -1,
                title: upcomingEvent.title,
                timestamp: upcomingEvent.date,
                location: upcomingEvent.location,
                information: upcomingEvent.information,
                category: "Event",
              })
            }
          />
        ))}
        {/* Schedule Event */}
        {profile?.is_life_group_admin && (
          <ButtonBig
            icon={
              <Lucide
                name="calendar-plus"
                color={theme.iconAccent}
                size={fonts.sizes.h3}
              />
            }
            text="Schedule Event"
            textColor={theme.iconAccent}
            backgroundColor={theme.iconPrimary}
            onButtonPress={routeToScheduleEventPage}
          />
        )}
        {/* Life Group Members */}
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
          Members
        </Text>
        <View style={styles.lifeGroupMembersContainer}>
          {lifeGroupMembers?.map((lifeGroupMember) =>
            lifeGroupMember.id === user.id ? (
              <PersonListItem
                key={lifeGroupMember.id}
                isUser={true}
                name={lifeGroupMember.full_name ?? ""}
                role={getRole(lifeGroupMember.life_group_role_id ?? 0)}
                onProfilePress={() => {}}
              />
            ) : (
              <PersonListItem
                key={lifeGroupMember.id}
                isUser={false}
                name={lifeGroupMember.full_name ?? ""}
                role={getRole(lifeGroupMember.life_group_role_id ?? 0)}
                onProfilePress={() => routeToProfilePage(lifeGroupMember.id)}
              />
            ),
          )}
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
  lifeGroupMembersContainer: {
    gap: 0,
  },
});
