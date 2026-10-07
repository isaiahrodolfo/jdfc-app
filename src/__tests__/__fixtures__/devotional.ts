import type { DevotionLesson } from "@/contexts/TabsContext";

export const DEVOTIONAL_TEST_USER_ID =
  "e2533067-88fd-47a5-a62a-a6494d45d10e";
export const DEVOTIONAL_TEST_EMAIL = "devotional-test@jdfc.local";
export const DEVOTIONAL_TEST_PASSWORD = "devotional-test-password";
export const DEVOTIONAL_TEST_LINK =
  "https://example.test/devotional/jest-fixture";
export const DEVOTIONAL_TEST_LESSON_ID = 920001;

const today = new Date();
const dateKey = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0"),
].join("-");

export const DEVOTIONAL_FIXTURE: DevotionLesson = {
  lessonId: DEVOTIONAL_TEST_LESSON_ID,
  isCompleted: false,
  dateKey,
  title: "Jest devotional fixture",
  author: "Test Author",
  content: "First test paragraph.\nSecond test paragraph.",
  excerpt: "A sample devotional for integration tests.",
  insights: "A sample insight.",
  response: "A sample response.",
  thought: "A sample thought.",
  verse: "Be still, and know that I am God.",
  passageReference: "Psalm 46:10",
  passageUrl: "https://example.test/bible/psalm-46-10",
  bibleInYear: "Psalm 46",
  bibleInYearUrl: "https://example.test/bible/psalm-46",
  imageUrl: "https://example.test/devotional.jpg",
  audioUrl: "https://example.test/devotional.mp3",
  categories: "Trust",
  slug: "jest-devotional-fixture",
  language: "en",
  odbUrl: DEVOTIONAL_TEST_LINK,
};
