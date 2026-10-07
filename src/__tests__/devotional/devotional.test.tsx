import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import type { Ref } from "react";
import type { User } from "@supabase/supabase-js";
import { router, useLocalSearchParams } from "expo-router";
import { toastiva } from "toastiva";

import { supabase } from "@/lib/supabase";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useTabs } from "@/contexts/TabsContext";
import Home from "@/app/(tabs)/index";
import DevotionPage from "@/app/devotional/[link]";
import {
  DEVOTIONAL_FIXTURE,
  DEVOTIONAL_TEST_EMAIL,
  DEVOTIONAL_TEST_LESSON_ID,
  DEVOTIONAL_TEST_LINK,
  DEVOTIONAL_TEST_PASSWORD,
  DEVOTIONAL_TEST_USER_ID,
} from "@/__tests__/__fixtures__/devotional";

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
    back: jest.fn(),
  },
  useLocalSearchParams: jest.fn(),
}));

jest.mock("toastiva", () => ({
  toastiva: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("@/contexts/ThemeContext", () => ({
  useTheme: () => ({
    theme: {
      primary: "#ffffff",
      secondary: "#eeeeee",
      text: "#111111",
      textH1: "#111111",
      textH2: "#111111",
      iconPrimary: "#222222",
      iconSecondary: "#333333",
      iconAccent: "#ffffff",
    },
    fonts: {
      family: "Arial",
      sizes: { h1: 24, h2: 22, h4: 18, h5: 16, h6: 14 },
    },
  }),
}));

jest.mock("@/contexts/TabsContext", () => ({
  useTabs: jest.fn(),
}));

jest.mock("@/hooks/use-auth-context", () => ({
  useAuthContext: jest.fn(),
}));

jest.mock("@/lib/supabase", () => {
  const { createClient } = jest.requireActual<
    typeof import("@supabase/supabase-js")
  >("@supabase/supabase-js");

  return {
    supabase: createClient(
      process.env.EXPO_PUBLIC_SUPABASE_URL!,
      process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          detectSessionInUrl: false,
          persistSession: false,
        },
      },
    ),
  };
});

jest.mock("@/components/cards/LessonCard", () => {
  const React = jest.requireActual<typeof import("react")>("react");
  const { Pressable, Text } =
    jest.requireActual<typeof import("react-native")>("react-native");

  return function MockLessonCard({
    titleHeading,
    onLessonPress,
  }: {
    titleHeading: string;
    onLessonPress: () => void;
  }) {
    return React.createElement(
      Pressable,
      { accessibilityRole: "button", onPress: onLessonPress },
      React.createElement(Text, null, titleHeading),
    );
  };
});

jest.mock("@/components/cards/AnnouncementCard", () => () => null);
jest.mock("@/components/cards/EventCardBig", () => () => null);
jest.mock("@/components/cards/EventCardSmall", () => () => null);

jest.mock("@/components/cards/PreviewTitleCard", () => {
  const React = jest.requireActual<typeof import("react")>("react");
  const { Text } =
    jest.requireActual<typeof import("react-native")>("react-native");

  return function MockPreviewTitleCard({ title }: { title: string }) {
    return React.createElement(Text, null, title);
  };
});

jest.mock("@/components/miscellaneous/NoteEditor", () => {
  const React = jest.requireActual<typeof import("react")>("react");
  const { Text } =
    jest.requireActual<typeof import("react-native")>("react-native");

  return {
    __esModule: true,
    default: React.forwardRef(function MockNoteEditor(
      {
        onSaveNotes,
        onClose,
        initialContent,
      }: {
        onSaveNotes: (html: string) => Promise<void>;
        onClose?: () => void;
        initialContent: string;
      },
      ref: Ref<{ saveAndClose: () => Promise<void> }>,
    ) {
      React.useImperativeHandle(ref, () => ({
        saveAndClose: async () => {
          await onSaveNotes("<p>Saved from the devotional test.</p>");
          onClose?.();
        },
      }));

      return React.createElement(
        Text,
        { testID: "note-editor" },
        initialContent || "Notes",
      );
    }),
  };
});

const mockedUseAuthContext = jest.mocked(useAuthContext);
const mockedUseTabs = jest.mocked(useTabs);
const mockedUseLocalSearchParams = jest.mocked(useLocalSearchParams);

const DEVOTIONAL_DATE = new Date(
  `${DEVOTIONAL_FIXTURE.dateKey}T00:00:00`,
);
const INVALID_USER_ID = "00000000-0000-4000-8000-000000000000";

let testUser: User;

const emptyTabs: ReturnType<typeof useTabs> = {
  announcements: [],
  liveEvents: [],
  recentLiveEventLessons: [],
  upcomingEvents: [],
  devotionals: [],
  setDevotionals: jest.fn(),
  todaysDevotional: null,
  devotionalsProgress: [],
  todaysDate: DEVOTIONAL_DATE,
  profile: null,
  lifeGroupMembers: null,
  refreshPage: async () => {},
};

function getTestUser(): User {
  if (!testUser) {
    throw new Error("The local Supabase test user has not signed in.");
  }

  return testUser;
}

async function setTestNotes(userId: string, notes: string) {
  const { error } = await supabase.from("users_lessons").upsert(
    {
      user_id: userId,
      lesson_id: DEVOTIONAL_TEST_LESSON_ID,
      notes,
    },
    { onConflict: "user_id,lesson_id" },
  );

  if (error) throw error;
}

async function clearTestNotes(userId: string) {
  const { error } = await supabase
    .from("users_lessons")
    .delete()
    .eq("user_id", userId)
    .eq("lesson_id", DEVOTIONAL_TEST_LESSON_ID);

  if (error) throw error;
}

async function renderDevotionPage(user: User = getTestUser()) {
  mockedUseAuthContext.mockReturnValue({
    session: null,
    user,
    isLoading: false,
    isLoggedIn: true,
  });
  mockedUseTabs.mockReturnValue({
    ...emptyTabs,
    devotionals: [DEVOTIONAL_FIXTURE],
  });

  return render(<DevotionPage />);
}

beforeAll(async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: DEVOTIONAL_TEST_EMAIL,
    password: DEVOTIONAL_TEST_PASSWORD,
  });

  if (error) {
    throw new Error(`Could not sign in to local Supabase: ${error.message}`);
  }
  if (data.user.id !== DEVOTIONAL_TEST_USER_ID) {
    throw new Error("The signed-in Supabase user did not match the test seed.");
  }

  testUser = data.user;
});

beforeEach(async () => {
  await clearTestNotes(getTestUser().id);
  jest.clearAllMocks();
  jest.spyOn(console, "log").mockImplementation(() => {});
  mockedUseAuthContext.mockReturnValue({
    session: null,
    user: getTestUser(),
    isLoading: false,
    isLoggedIn: true,
  });
  mockedUseTabs.mockReturnValue(emptyTabs);
  mockedUseLocalSearchParams.mockReturnValue({
    link: DEVOTIONAL_TEST_LINK,
    title: DEVOTIONAL_FIXTURE.title,
    dateKey: DEVOTIONAL_FIXTURE.dateKey,
  });
});

afterAll(async () => {
  if (testUser) {
    await clearTestNotes(testUser.id);
    await supabase.auth.signOut();
  }
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("devotional page", () => {
  it("routes from today's devotion with the matching lesson id", async () => {
    mockedUseTabs.mockReturnValue({
      ...emptyTabs,
      devotionals: [DEVOTIONAL_FIXTURE],
      todaysDate: DEVOTIONAL_DATE,
    });

    const { getByRole } = await render(<Home />);
    await fireEvent.press(
      getByRole("button", { name: DEVOTIONAL_FIXTURE.title }),
    );

    expect(router.push).toHaveBeenCalledWith({
      pathname: "/devotional/[link]",
      params: {
        link: DEVOTIONAL_TEST_LINK,
        title: DEVOTIONAL_FIXTURE.title,
        dateKey: DEVOTIONAL_FIXTURE.dateKey,
        lessonId: DEVOTIONAL_TEST_LESSON_ID,
      },
    });
  });

  it("shows an error screen if the requested devotion is not in the context", async () => {
    mockedUseTabs.mockReturnValue(emptyTabs);

    const { getByRole, getByText } = await render(<DevotionPage />);

    expect(getByRole("alert")).toBeTruthy();
    expect(getByText("Devotion unavailable")).toBeTruthy();
    expect(
      getByText(
        "We couldn't find a devotion for this date. Please try again later.",
      ),
    ).toBeTruthy();
  });

  it("shows devotion information when the date is present", async () => {
    await setTestNotes(getTestUser().id, "<p>Existing test notes.</p>");

    const { getByText } = await renderDevotionPage();

    expect(getByText(DEVOTIONAL_FIXTURE.title)).toBeTruthy();
    expect(getByText(DEVOTIONAL_FIXTURE.verse)).toBeTruthy();
    expect(getByText("First test paragraph.")).toBeTruthy();
    expect(getByText("Second test paragraph.")).toBeTruthy();
    await fireEvent.press(getByText("Take Notes"));
    expect(
      await screen.findByText("<p>Existing test notes.</p>"),
    ).toBeTruthy();
  });

  it("shows a Toastiva error when notes cannot be found", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    await renderDevotionPage();
    await waitFor(() => {
      expect(toastiva.error).toHaveBeenCalledWith(
        "Cannot find notes for devotion",
      );
    });
  });

  it("shows a Toastiva error when saving notes fails", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    const userWithoutDatabaseRecord = {
      ...getTestUser(),
      id: INVALID_USER_ID,
    };

    await renderDevotionPage(userWithoutDatabaseRecord);
    await waitFor(() => {
      expect(toastiva.error).toHaveBeenCalledWith(
        "Cannot find notes for devotion",
      );
    });
    jest.mocked(toastiva.error).mockClear();

    await fireEvent.press(screen.getByText("Take Notes"));
    screen.getByText("Save Notes");

    await act(async () => {
      await fireEvent.press(screen.getByText("Save Notes"));
      await waitFor(() => {
        expect(toastiva.error).toHaveBeenCalledWith("Failed to save notes");
      });
    });
    expect(router.back).not.toHaveBeenCalled();
  });

  it("saves notes to Supabase, shows success, and returns to the previous page", async () => {
    await setTestNotes(getTestUser().id, "<p>Existing test notes.</p>");

    const { getByText } = await renderDevotionPage();
    await fireEvent.press(getByText("Take Notes"));
    await screen.findByText("<p>Existing test notes.</p>");

    await act(async () => {
      await fireEvent.press(screen.getByText("Save Notes"));
      await waitFor(() => {
        expect(toastiva.success).toHaveBeenCalledWith(
          "Successfully saved notes",
        );
        expect(router.back).toHaveBeenCalledTimes(1);
      });
    });

    const { data, error } = await supabase
      .from("users_lessons")
      .select("notes")
      .eq("user_id", getTestUser().id)
      .eq("lesson_id", DEVOTIONAL_TEST_LESSON_ID)
      .single();

    if (error) throw error;
    expect(data.notes).toBe("<p>Saved from the devotional test.</p>");
  });
});
