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
import { getLifeGroupMembers } from "@/api/supabase/lifeGroup/getLifeGroupMembers";
import { getDevotionals } from "@/api/supabase/our_daily_bread/getDevotionals";
import { getProfile } from "@/api/supabase/profile/getProfile";
import { dateKeyToLocalDate } from "@/components/helpers/dateKeyToLocalDate";
import { CheckboxData } from "@/components/progress_tracker/CheckboxesContainer";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Database } from "../../database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

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
  profile: Profile | null;
  lifeGroupMembers: Profile[] | null;
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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [lifeGroupMembers, setLifeGroupMembers] = useState<Profile[] | null>(
    null,
  );

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
    const start = performance.now();

    const timed = async <T,>(name: string, promise: Promise<T>): Promise<T> => {
      const start = performance.now();

      const result = await promise;

      console.log(`${name}: ${(performance.now() - start).toFixed(0)}ms`);

      return result;
    };

    const profileData = await timed("getProfile", getProfile(user.id));

    const [
      liveEventsData,
      recentLiveEventLessonsData,
      announcementsData,
      upcomingEventsData,
      devotionalsData,
      lifeGroupMembersData,
    ] = await Promise.all([
      timed("getLiveEvents", getLiveEvents()),
      timed("getRecentLiveEventLessons", getRecentLiveEventLessons()),
      timed("getAnnouncements", getAnnouncements()),
      timed("getUpcomingEvents", getUpcomingEvents()),
      timed("getDevotionals", getDevotionals()),
      timed(
        "getLifeGroupMembers",
        profileData?.life_group_id != null
          ? getLifeGroupMembers(profileData.life_group_id)
          : Promise.resolve([]),
      ),
    ]);

    console.log(
      `Initial Promise.all: ${(performance.now() - start).toFixed(0)}ms`,
    );

    setLiveEvents(liveEventsData);
    setRecentLiveEventLessons(recentLiveEventLessonsData);
    setAnnouncements(announcementsData);
    setUpcomingEvents(upcomingEventsData);
    setProfile(profileData ?? null);
    setLifeGroupMembers(lifeGroupMembersData);

    const devotionalsStart = performance.now();

    const devotionalsWithIds = await Promise.all(
      devotionalsData.map(async (devotional) => {
        const start = performance.now();

        const { lessonId, isCompleted } = await findDevotional(
          devotional.odbUrl,
          devotional.title,
          devotional.dateKey,
          user.id,
        );

        console.log(
          `findDevotional ${devotional.dateKey}: ${(performance.now() - start).toFixed(0)}ms`,
        );

        return {
          ...devotional,
          lessonId,
          isCompleted,
        };
      }),
    );

    console.log(
      `All findDevotional calls: ${(performance.now() - devotionalsStart).toFixed(0)}ms`,
    );

    setDevotionals(devotionalsWithIds);

    const progressStart = performance.now();

    const devotionalsProgressData = await getDevotionalsProgress();

    console.log(
      `getDevotionalsProgress: ${(performance.now() - progressStart).toFixed(0)}ms`,
    );

    setDevotionalsProgressData(devotionalsProgressData);

    const todaysDate = getTodaysDate();
    setTodaysDate(todaysDate);

    setTodaysDevotional(
      devotionalsWithIds.find(
        (devotional) =>
          dateKeyToLocalDate(devotional.dateKey).getTime() ===
          todaysDate.getTime(),
      ) ?? null,
    );

    console.log(
      `TOTAL refreshPage: ${(performance.now() - start).toFixed(0)}ms`,
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
        profile,
        lifeGroupMembers,
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
