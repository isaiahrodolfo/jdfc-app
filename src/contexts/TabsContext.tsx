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

type TabsContextType = {
  announcements: Announcement[];
  liveEvents: LiveEvent[];
  refreshAnnouncements: () => Promise<void>;
  refreshLiveEvents: () => Promise<void>;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function TabsProvider({ children }: { children: ReactNode }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);

  const refreshAnnouncements = async () => {
    const data = await getAnnouncements();
    setAnnouncements(data);
  };

  const refreshLiveEvents = async () => {
    const data = await getLiveEvents();
    setLiveEvents(data);
  };

  useEffect(() => {
    refreshAnnouncements();
    refreshLiveEvents();
  }, []);

  return (
    <TabsContext.Provider
      value={{
        announcements,
        liveEvents,
        refreshAnnouncements,
        refreshLiveEvents,
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
