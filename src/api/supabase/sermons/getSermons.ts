import { supabase } from "@/lib/supabase";

export type UserSermon = {
  lessonId: number;
  title: string;
  date: string | null;
  seriesId: number | null;
  slideshowId: number;
  slideshowLink: string | null;
  speakerName: string | null;
  isLive: boolean;
  youtubeLink: string | null;
  isFavorited: boolean;
};

/**
 * Get a page of sermons given the page and number of items per page.
 * Return the sermons as a list, the total number of sermons in the table, and the total amount of pages possible.
 *
 * @export
 * @async
 * @param {number} page - The page number (1-indexed).
 * @param {number} pageSize - The amount of items (sermons) per page.
 * @returns {Promise<{
 *   data: UserSermon[];
 *   count: number | null;
 *   totalPages: number;
 * }>}
 */
export async function getSermons(
  page: number,
  pageSize: number,
  userId?: string,
  searchQuery?: string,
): Promise<{
  data: UserSermon[];
  count: number | null;
  totalPages: number;
}> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase.from("sermons").select(
    `
      youtube_link,
      slideshows (
        id,
        slideshow_link,
        speaker_name,
        is_live,
        lessons!inner (
          id,
          title,
          date,
          series_id
        )
      )
    `,
    { count: "exact" },
  );

  // Search by lessons.title
  if (searchQuery?.trim()) {
    query = query.ilike("slideshows.lessons.title", `%${searchQuery.trim()}%`);
  }

  const { data, error, count } = await query.range(from, to);

  // TODO: Gracefully handle error
  if (error) {
    throw error;
  }

  // Join with user favorited lessons (skip this step if anonymous user)
  const lessonIds = data
    .filter((sermon) => sermon.slideshows != null)
    .map((sermon) => sermon.slideshows!.lessons.id);

  const matchedSermons = data.filter(
    (sermon) => sermon.slideshows?.lessons != null,
  );

  let favoriteMap = new Map<number, boolean>();

  if (userId) {
    const { data: userLessons, error: userLessonsError } = await supabase
      .from("users_lessons")
      .select("lesson_id, is_favorited")
      .eq("user_id", userId)
      .in("lesson_id", lessonIds);

    if (userLessonsError) throw userLessonsError;

    favoriteMap = new Map(
      userLessons.map((userLesson) => [
        userLesson.lesson_id,
        userLesson.is_favorited,
      ]),
    );
  }

  const sermons: UserSermon[] = matchedSermons.map((sermon) => {
    const slideshow = sermon.slideshows;
    const lesson = slideshow.lessons;

    return {
      lessonId: lesson.id,
      title: lesson.title,
      date: lesson.date,
      seriesId: lesson.series_id,
      slideshowId: slideshow.id,
      slideshowLink: slideshow.slideshow_link,
      speakerName: slideshow.speaker_name,
      isLive: slideshow.is_live,
      youtubeLink: sermon.youtube_link,
      isFavorited: favoriteMap.get(lesson.id) ?? false,
    };
  });

  return {
    data: sermons,
    count,
    totalPages: count ? Math.ceil(count / pageSize) : 0,
  };
}
