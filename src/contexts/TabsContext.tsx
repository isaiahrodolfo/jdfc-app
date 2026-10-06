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
import getDevotionalsProgress from "@/api/supabase/devotion/getDevotionalsProgress";
import { LiveEvent, getLiveEvents } from "@/api/supabase/events/getLiveEvents";
import {
  RecentLiveEventLesson,
  getRecentLiveEventLessons,
} from "@/api/supabase/events/getRecentLiveEventLessons";
import {
  UpcomingEvent,
  getUpcomingEvents,
} from "@/api/supabase/events/getUpcomingEvents";
import { getDevotionals } from "@/api/supabase/our_daily_bread/getDevotionals";
import { CheckboxData } from "@/components/progress_tracker/CheckboxesContainer";
import { useAuthContext } from "@/hooks/use-auth-context";

export type DevotionLesson = {
  lessonId: number;
  isCompleted: boolean;
  dateKey: string;
  title: string;
  author: string;
  content: string;
  excerpt: string;
  insights: string;
  response: string;
  thought: string;
  verse: string;
  passageReference: string;
  passageUrl: string;
  bibleInYear: string;
  bibleInYearUrl: string;
  imageUrl: string;
  audioUrl: string;
  categories: string;
  slug: string;
  language: string;
  odbUrl: string;
};

type TabsContextType = {
  announcements: Announcement[];
  liveEvents: LiveEvent[];
  recentLiveEventLessons: RecentLiveEventLesson[];
  upcomingEvents: UpcomingEvent[];
  devotionals: DevotionLesson[];
  setDevotionals: React.Dispatch<React.SetStateAction<DevotionLesson[]>>;
  todaysDevotional: DevotionLesson | null;
  devotionalsProgress: CheckboxData[];
  todaysDate: Date;
  refreshPage: () => Promise<void>;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const getTodaysDate = (): Date => {
  const today = new Date();

  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
};

export function TabsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthContext();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [recentLiveEventLessons, setRecentLiveEventLessons] = useState<
    RecentLiveEventLesson[]
  >([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [devotionals, setDevotionals] = useState<DevotionLesson[]>([]);
  const [todaysDevotional, setTodaysDevotional] =
    useState<DevotionLesson | null>(null);
  const [devotionalsProgressData, setDevotionalsProgressData] = useState<
    CheckboxData[]
  >([]);
  const [todaysDate, setTodaysDate] = useState<Date>(getTodaysDate());

  const devotionalsByDate = new Map(
    devotionals.map((devotional) => [devotional.dateKey, devotional]),
  );
  const devotionalsProgress = devotionalsProgressData.map((progress) => {
    const devotional = progress.dateKey
      ? devotionalsByDate.get(progress.dateKey)
      : undefined;

    return devotional
      ? { ...progress, isChecked: devotional.isCompleted }
      : progress;
  });

  const refreshPage = async () => {
    const [
      liveEventsData,
      recentLiveEventLessonsData,
      announcementsData,
      upcomingEventsData,
      devotionalsData,
    ] = await Promise.all([
      getLiveEvents(),
      getRecentLiveEventLessons(),
      getAnnouncements(),
      getUpcomingEvents(),
      getDevotionals(),
    ]);
    setLiveEvents(liveEventsData);
    setRecentLiveEventLessons(recentLiveEventLessonsData);
    setAnnouncements(announcementsData);
    setUpcomingEvents(upcomingEventsData);

    // Make sure the devotionals can be found within Supabase
    const devotionalsWithIds = await Promise.all(
      devotionalsData.map(async (devotional) => {
        const { lessonId, isCompleted } = await findDevotional(
          devotional.odbUrl,
          devotional.title,
          devotional.dateKey,
          user.id,
        );

        return {
          ...devotional,
          lessonId,
          isCompleted,
        };
      }),
    );
    setDevotionals(devotionalsWithIds);

    const devotionalsProgressData = await getDevotionalsProgress();
    setDevotionalsProgressData(devotionalsProgressData);

    const todaysDate = getTodaysDate();
    setTodaysDate(todaysDate);
    setTodaysDevotional(
      devotionalsWithIds.find(
        (devotional) => new Date(devotional.dateKey) === todaysDate,
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
        recentLiveEventLessons,
        upcomingEvents,
        devotionals,
        setDevotionals,
        todaysDevotional,
        devotionalsProgress,
        todaysDate,
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
