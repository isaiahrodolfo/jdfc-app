import { DevotionLesson } from "@/contexts/TabsContext";
import { router } from "expo-router";

export const handleDevotionalPress = (devotional: DevotionLesson) => {
  // Navigate to a detailed view
  router.push({
    pathname: "/devotional/[odbUrl]",
    params: {
      lessonId: devotional.lessonId,
      dateKey: devotional.dateKey,
      title: devotional.title,
      author: devotional.author,
      content: devotional.content,
      excerpt: devotional.excerpt,
      insights: devotional.insights,
      response: devotional.response,
      thought: devotional.thought,
      verse: devotional.verse,
      passageReference: devotional.passageReference,
      passageUrl: devotional.passageUrl,
      bibleInYear: devotional.bibleInYear,
      bibleInYearUrl: devotional.bibleInYearUrl,
      imageUrl: devotional.imageUrl,
      audioUrl: devotional.audioUrl,
      categories: devotional.categories,
      slug: devotional.slug,
      language: devotional.language,
      odbUrl: devotional.odbUrl,
    },
  });
};
