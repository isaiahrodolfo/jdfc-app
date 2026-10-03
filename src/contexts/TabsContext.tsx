import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  Announcement,
  getAnnouncements,
} from "@/api/supabase/announcements/getAnnouncements";

import { findDevotional } from "@/api/supabase/devotion/findDevotional";
import { LiveEvent, getLiveEvents } from "@/api/supabase/events/getLiveEvents";
import {
  UpcomingEvent,
  getUpcomingEvents,
} from "@/api/supabase/events/getUpcomingEvents";
import { getDevotionals } from "@/api/supabase/our_daily_bread/getDevotionals";
import { Devotional } from "@/api/supabase/our_daily_bread/odb_api";

type TabsContextType = {
  announcements: Announcement[];
  liveEvents: LiveEvent[];
  upcomingEvents: UpcomingEvent[];
  devotionals: Devotional[];
  todaysDevotional: Devotional | null;
  todaysDateKey: string;
  refreshPage: () => Promise<void>;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const getTodaysDateKey = (): string => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(today.getDate()).padStart(2, "0")}`;
};

export function TabsProvider({ children }: { children: ReactNode }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [devotionals, setDevotionals] = useState<Devotional[]>([]);
  const [todaysDevotional, setTodaysDevotional] = useState<Devotional | null>(
    null,
  );
  const [todaysDateKey, setTodaysDateKey] = useState<string>(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(today.getDate()).padStart(2, "0")}`;
  });

  useEffect(() => {
    setTodaysDateKey(getTodaysDateKey());
  }, []);

  const refreshPage = async () => {
    const liveEventsData = await getLiveEvents();
    setLiveEvents(liveEventsData);

    const announcementsData = await getAnnouncements();
    setAnnouncements(announcementsData);

    const upcomingEventsData = await getUpcomingEvents();
    setUpcomingEvents(upcomingEventsData);

    const devotionalsData = await getDevotionals();
    // Make sure the devotionals can be found within Supabase
    devotionalsData.forEach((devotional) => {
      findDevotional(
        devotional.odbUrl,
        devotional.title,
        devotional.dateKey,
      ).catch((error) => {
        console.error(
          `Error upserting devotional with link ${devotional.odbUrl}:`,
          error,
        );
      });
    });
    setDevotionals(devotionalsData);

    const todaysDateKey = getTodaysDateKey();
    setTodaysDateKey(todaysDateKey);
    setTodaysDevotional(
      devotionalsData.find(
        (devotional) => devotional.dateKey === todaysDateKey,
      ) ?? null,
    );
  };

  useEffect(() => {
    refreshPage();
  }, []);

  return (
    <TabsContext.Provider
      value={{
        announcements,
        liveEvents,
        upcomingEvents,
        devotionals,
        todaysDevotional,
        todaysDateKey,
        refreshPage,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
}

export function useTabs() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("useTabs must be used inside a TabsProvider");
  }

  return context;
}
