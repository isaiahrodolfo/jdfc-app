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

import { LiveEvent, getLiveEvents } from "@/api/supabase/events/getLiveEvents";
import {
  UpcomingEvent,
  getUpcomingEvents,
} from "@/api/supabase/events/getUpcomingEvents";
import { getTodaysDevotional } from "@/api/supabase/our_daily_bread/getTodaysDevotional";
import { Devotional } from "@/api/supabase/our_daily_bread/odb_api";

type TabsContextType = {
  announcements: Announcement[];
  liveEvents: LiveEvent[];
  upcomingEvents: UpcomingEvent[];
  todaysDevotional: Devotional | null;
  refreshHomePage: () => Promise<void>;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function TabsProvider({ children }: { children: ReactNode }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [todaysDevotional, setTodaysDevotional] = useState<Devotional | null>(
    null,
  );

  const refreshHomePage = async () => {
    const liveEventsData = await getLiveEvents();
    setLiveEvents(liveEventsData);

    const announcementsData = await getAnnouncements();
    setAnnouncements(announcementsData);

    const upcomingEventsData = await getUpcomingEvents();
    setUpcomingEvents(upcomingEventsData);

    const todaysDevotionalData = await getTodaysDevotional();
    setTodaysDevotional(todaysDevotionalData);
  };

  useEffect(() => {
    refreshHomePage();
  }, []);

  return (
    <TabsContext.Provider
      value={{
        announcements,
        liveEvents,
        upcomingEvents,
        todaysDevotional,
        refreshHomePage,
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
