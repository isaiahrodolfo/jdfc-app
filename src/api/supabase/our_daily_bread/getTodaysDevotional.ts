import { Devotional, fetchDevotionals } from "./odb_api";

/**
 * Gets today's devotional
 *
 * @export
 * @async
 * @returns {Promise<Devotional | null>}
 */
export async function getTodaysDevotional(): Promise<Devotional | null> {
  const devotionals = await fetchDevotionals();

  const today = new Date();

  const dateKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const todaysDevotional = devotionals.get(dateKey);

  if (!todaysDevotional) {
    return null;
  }

  return todaysDevotional;
}
