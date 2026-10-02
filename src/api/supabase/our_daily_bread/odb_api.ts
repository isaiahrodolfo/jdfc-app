/*
 * -------------------------------------------------------------------
 * The following function is adapted from a snippet by GitHub user
 * @sgeorge83
 *
 * Original Repository:
 * https://github.com/sgeorge83/dailybread-pwa/
 *
 * License: MIT License
 * -------------------------------------------------------------------
 */

const ODB_API = "https://api.experience.odb.org/devotionals/";
const SYNC_KEY = "dailybread-last-sync";

let lastUpdated: Date | null = null;

export type Devotional = {
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

function dateKeyFromMs(ms: number) {
  return new Date(ms).toISOString().slice(0, 10);
}

export function stripHtml(html: string) {
  if (!html) return "";

  return (
    html
      // Convert common HTML line breaks to newlines
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<\/div>/gi, "\n")

      // Remove HTML tags
      .replace(/<[^>]*>/g, "")

      // Decode common HTML entities
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&#x27;/gi, "'")

      .replace(/\s+\n/g, "\n")
      .trim()
  );
}

export function normalizeDevotional(item: any): Devotional {
  const dateKey = dateKeyFromMs(item.date_id || item.date);

  const normalizedDevotional: Devotional = {
    dateKey,
    title: item.title || "",
    author: item.author_name || item.lang_author_name || "",
    content: stripHtml(item.content),
    excerpt: stripHtml(item.excerpt),
    insights: stripHtml(item.insights),
    response: stripHtml(item.response),
    thought: stripHtml(item.thought),
    verse: stripHtml(item.verse),
    passageReference: (item.passage_reference || "").trim(),
    passageUrl: item.passage_url || "",
    bibleInYear: item.bible_in_a_year_references || "",
    bibleInYearUrl: item.bible_in_a_year_url || "",
    imageUrl: item.image_url || "",
    audioUrl: item.audio_url || "",
    categories: item.categories || [],
    slug: item.slug || "",
    language: item.language || "en_US",
    odbUrl: item.slug
      ? `https://odb.org/${dateKey.replace(/-/g, "/")}/${item.slug}/`
      : `https://odb.org/${dateKey.replace(/-/g, "/")}/`,
  };

  return normalizedDevotional;
}

export async function fetchDevotionals(): Promise<Map<string, Devotional>> {
  // Do NOT add custom headers — they trigger CORS preflight
  // which ODB blocks on the web.
  const response = await fetch(ODB_API);

  if (!response.ok) {
    throw new Error(`ODB API error: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data) || !data.length) {
    throw new Error("ODB API returned empty data");
  }

  const map = new Map<string, Devotional>();

  for (const item of data) {
    const devotional = normalizeDevotional(item);
    map.set(devotional.dateKey, devotional);
  }

  lastUpdated = new Date();

  return map;
}

export function getLastUpdated(): Date | null {
  return lastUpdated;
}

/** Re-fetch when a new calendar day starts or data is older than 4 hours */
export function needsRefresh(): boolean {
  const last = getLastUpdated();

  if (!last) return true;

  const now = new Date();

  const sameDay =
    last.getFullYear() === now.getFullYear() &&
    last.getMonth() === now.getMonth() &&
    last.getDate() === now.getDate();

  if (!sameDay) return true;

  return (now.getTime() - last.getTime()) / (1000 * 60 * 60) >= 4;
}
