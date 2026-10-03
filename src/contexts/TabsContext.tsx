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
  upcomingEvents: UpcomingEvent[];
  devotionals: DevotionLesson[];
  setDevotionals: React.Dispatch<React.SetStateAction<DevotionLesson[]>>;
  todaysDevotional: DevotionLesson | null;
  devotionalsProgress: CheckboxData[];
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
  const { user } = useAuthContext();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [devotionals, setDevotionals] = useState<DevotionLesson[]>([]);
  const [todaysDevotional, setTodaysDevotional] =
    useState<DevotionLesson | null>(null);
  const [devotionalsProgress, setDevotionalsProgress] = useState<
    CheckboxData[]
  >([]);
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

  useEffect(() => {
    const progressDateKeys = new Map<number, string>();
    const today = new Date(`${todaysDateKey}T00:00:00`);

    for (let daysAgo = 0; daysAgo < 14; daysAgo += 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - daysAgo);
      progressDateKeys.set(
        date.getDate(),
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0",
        )}-${String(date.getDate()).padStart(2, "0")}`,
      );
    }

    const devotionalsByDate = new Map(
      devotionals.map((devotional) => [devotional.dateKey, devotional]),
    );

    setDevotionalsProgress((prev) => {
      let hasChanges = false;
      const next = prev.map((progress) => {
        const dateKey = progressDateKeys.get(progress.date);
        const devotional = dateKey
          ? devotionalsByDate.get(dateKey)
          : undefined;

        if (!devotional || progress.isChecked === devotional.isCompleted) {
          return progress;
        }

        hasChanges = true;
        return { ...progress, isChecked: devotional.isCompleted };
      });

      return hasChanges ? next : prev;
    });
  }, [devotionals, todaysDateKey]);

  const refreshPage = async () => {
    const liveEventsData = await getLiveEvents();
    setLiveEvents(liveEventsData);

    const announcementsData = await getAnnouncements();
    setAnnouncements(announcementsData);

    const upcomingEventsData = await getUpcomingEvents();
    setUpcomingEvents(upcomingEventsData);

    const devotionalsData = await getDevotionals();
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
    devotionalsWithIds.map((devotion) => {
      console.log(devotion.lessonId, devotion.isCompleted);
    });

    const devotionalsProgressData = await getDevotionalsProgress();
    setDevotionalsProgress(devotionalsProgressData);

    const todaysDateKey = getTodaysDateKey();
    setTodaysDateKey(todaysDateKey);
    setTodaysDevotional(
      devotionalsWithIds.find(
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
        setDevotionals,
        todaysDevotional,
        devotionalsProgress,
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
