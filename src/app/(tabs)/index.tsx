import { useEffect, useState } from "react";
import { View } from "react-native";

import {
  Announcement,
  getAnnouncements,
} from "@/api/supabase/announcements/getAnnouncements";
import AnnouncementCard from "@/components/cards/AnnouncementCard";

export default function Home() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    getAnnouncements().then(setAnnouncements);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {announcements.map((announcement) => (
        <AnnouncementCard
          key={announcement.name}
          title={announcement.name}
          subtitle={announcement.category}
          colorName="accent"
        />
      ))}
    </View>
  );
}
