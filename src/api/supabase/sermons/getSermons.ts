import { supabase } from "@/lib/supabase";

type Sermon = {
  lessonId: number;
  title: string;
  date: string | null;
  seriesId: number | null;
  isFavorited: boolean;
  slideshowLink: string | null;
  speakerName: string | null;
  isLive: boolean;
  youtubeLink: string | null;
};

/**
 * Get a page of sermons given the page and number of items per page.
 * Return the sermons as a list, the total number of sermons in the table, and the total amount of pages possible.
 *
 * @export
 * @async
 * @param {number} page - The page number (0-indexed).
 * @param {number} pageSize - The amount of items (sermons) per page.
 * @returns {Promise<{
 *   data: Sermon[];
 *   count: number | null;
 *   totalPages: number;
 * }>}
 */
export async function getSermons(
  page: number,
  pageSize: number,
): Promise<{
  data: Sermon[];
  count: number | null;
  totalPages: number;
}> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("sermons")
    .select(
      `
      youtube_link,
      slideshows (
        slideshow_link,
        speaker_name,
        is_live,
        lessons (
          id,
          title,
          date,
          series_id,
          is_favorited
        )
      )
    `,
      { count: "exact" },
    )
    .range(from, to);

  if (error) throw error;

  const sermons: Sermon[] = data.map((sermon) => {
    const slideshow = sermon.slideshows;
    const lesson = slideshow.lessons;

    return {
      lessonId: lesson.id,
      title: lesson.title,
      date: lesson.date,
      seriesId: lesson.series_id,
      isFavorited: lesson.is_favorited,
      slideshowLink: slideshow.slideshow_link,
      speakerName: slideshow.speaker_name,
      isLive: slideshow.is_live,
      youtubeLink: sermon.youtube_link,
    };
  });

  return {
    data: sermons,
    count,
    totalPages: count ? Math.ceil(count / pageSize) : 0,
  };
}
