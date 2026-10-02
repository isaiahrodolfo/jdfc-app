import { Devotional, fetchDevotionals } from "./odb_api";

/**
 * Gets today's devotional
 *
 * @export
 * @async
 * @returns {Promise<Devotional[]>}
 */
export async function getDevotionals(): Promise<Devotional[]> {
  const devotionals = await fetchDevotionals();

  if (!devotionals) {
    return [];
  }

  return Array.from(devotionals.values());
}
