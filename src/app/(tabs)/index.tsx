import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import {
  Announcement,
  getAnnouncements,
} from "@/api/supabase/announcements/getAnnouncements";
import AnnouncementCard from "@/components/cards/AnnouncementCard";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { theme, fonts } = useTheme();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    getAnnouncements().then(setAnnouncements);
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.primary }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 96,
        paddingBottom: 96,
        paddingHorizontal: 36,
      }}
      showsVerticalScrollIndicator={false}
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
            colorName="accent"
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
    paddingBottom: 24,
  },
  h2: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
