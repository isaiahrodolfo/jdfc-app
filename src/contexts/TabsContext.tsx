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

type TabsContextType = {
  announcements: Announcement[];
  liveEvents: LiveEvent[];
  upcomingEvents: UpcomingEvent[];
  refreshHomePage: () => Promise<void>;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function TabsProvider({ children }: { children: ReactNode }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);

  const refreshHomePage = async () => {
    const liveEventsData = await getLiveEvents();
    setLiveEvents(liveEventsData);

    const announcementsData = await getAnnouncements();
    setAnnouncements(announcementsData);

    const upcomingEventsData = await getUpcomingEvents();
    setUpcomingEvents(upcomingEventsData);
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
