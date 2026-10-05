import type { createSeedClient } from "@snaplet/seed";

/**
 * Seed Life Class Lessons and Events
 *
 * Each series contains 7 daily lessons.
 * A separate recap session is scheduled every Sunday at 1:00 PM
 * at Jesus' Disciples Family Church.
 *
 * @export
 * @async
 * @param {Awaited<ReturnType<typeof createSeedClient>>} seed
 * @returns {*}
 */
export async function seedLifeClass(
  seed: Awaited<ReturnType<typeof createSeedClient>>,
  speakerId: string,
) {
  await seed.series([
    // Series 1
    {
      id: 401,
      series_number: 1,
      name: "Learning From Our Mistakes",
      track_id: 4,
    },

    // Series 2
    {
      id: 402,
      series_number: 2,
      name: "The Best Deal Of Your Life",
      track_id: 4,
    },

    // Series 3
    {
      id: 403,
      series_number: 3,
      name: "The Best Experience Of Your Life",
      track_id: 4,
    },

    // Series 4
    {
      id: 404,
      series_number: 4,
      name: "Life Is A Battle",
      track_id: 4,
    },

    // Series 5
    {
      id: 405,
      series_number: 5,
      name: "Encounter",
      track_id: 4,
    },

    // Series 6
    {
      id: 406,
      series_number: 6,
      name: "Discover The Secret That Will Transform Your Life",
      track_id: 4,
    },

    // Series 7
    {
      id: 407,
      series_number: 7,
      name: "Your Decisions Define You",
      track_id: 4,
    },

    // Series 8
    {
      id: 408,
      series_number: 8,
      name: "Nothing Less Than God's Best",
      track_id: 4,
    },

    // Series 9
    {
      id: 409,
      series_number: 9,
      name: "A New Beginning",
      track_id: 4,
    },
  ]);

  await seed.lessons([
    // ============================================================
    // SERIES 1 — LEARNING FROM OUR MISTAKES
    // October 19–25, 2026
    // ============================================================

    {
      title: "A New Day",
      church_lessons: [
        {
          lesson_number: 1,
          series_id: 401,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-19T13:00:00-07:00"),
          },
        },
      ],
    },

    {
      title: "An Opportunity For An Encounter",
      church_lessons: [
        {
          lesson_number: 2,
          series_id: 401,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-20T13:00:00-07:00"),
          },
        },
      ],
    },

    {
      title: "Is It Too Late For Reconciliation?",
      church_lessons: [
        {
          lesson_number: 3,
          series_id: 401,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-21T13:00:00-07:00"),
          },
        },
      ],
    },

    {
      title: "An Opportunity For Restoration",
      church_lessons: [
        {
          lesson_number: 4,
          series_id: 401,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-22T13:00:00-07:00"),
          },
        },
      ],
    },

    {
      title: "An Opportunity For Provision",
      church_lessons: [
        {
          lesson_number: 5,
          series_id: 401,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-23T13:00:00-07:00"),
          },
        },
      ],
    },

    {
      title: "Who Is Jesus?",
      church_lessons: [
        {
          lesson_number: 6,
          series_id: 401,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-24T13:00:00-07:00"),
          },
        },
      ],
    },

    {
      title: "Four Opportunities",
      church_lessons: [
        {
          lesson_number: 7,
          series_id: 401,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-25T13:00:00-07:00"),
          },
        },
      ],
    },

    {
      title: "Learning From Our Mistakes (Recap)",
      church_lessons: [
        {
          lesson_number: 8,
          series_id: 401,
        },
      ],
      lessons_events: [
        {
          lessons_events_speakers: [
            {
              user_id: speakerId,
            },
          ],
          events: {
            timestamp: new Date("2026-10-25T13:00:00-07:00"),
            location: "Jesus' Disciples Family Church",
            information:
              "Life Class Module 1 Week 1 Recap: Learning From Our Mistakes",
          },
        },
      ],
    },

    // ============================================================
    // SERIES 2 — THE BEST DEAL OF YOUR LIFE
    // October 26 – November 1, 2026
    // ============================================================

    {
      title: "The Best Deal Of Your Life",
      church_lessons: [
        {
          lesson_number: 1,
          series_id: 402,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-26T13:00:00-07:00"),
          },
        },
      ],
    },

    {
      title: "Jesus Took Our Place",
      church_lessons: [
        {
          lesson_number: 2,
          series_id: 402,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-27T13:00:00-07:00"),
          },
        },
      ],
    },

    {
      title: "The Miracle Of Exchange",
      church_lessons: [
        {
          lesson_number: 3,
          series_id: 402,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-28T13:00:00-07:00"),
          },
        },
      ],
    },

    {
      title: "Freedom At The Foot Of The Cross",
      church_lessons: [
        {
          lesson_number: 4,
          series_id: 402,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-29T13:00:00-07:00"),
          },
        },
      ],
    },

    {
      title: "Every Last Drop Of Blood",
      church_lessons: [
        {
          lesson_number: 5,
          series_id: 402,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-30T13:00:00-07:00"),
          },
        },
      ],
    },

    {
      title: "The Incomparable Price Jesus Paid For Me",
      church_lessons: [
        {
          lesson_number: 6,
          series_id: 402,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-31T13:00:00-07:00"),
          },
        },
      ],
    },

    {
      title: "Contemplating The Cross",
      church_lessons: [
        {
          lesson_number: 7,
          series_id: 402,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-01T13:00:00-07:00"),
          },
        },
      ],
    },

    {
      title: "The Best Deal Of Your Life (Recap)",
      church_lessons: [
        {
          lesson_number: 8,
          series_id: 402,
        },
      ],
      lessons_events: [
        {
          lessons_events_speakers: [
            {
              user_id: speakerId,
            },
          ],
          events: {
            timestamp: new Date("2026-11-01T13:00:00-07:00"),
            location: "Jesus' Disciples Family Church",
            information:
              "Life Class Module 1 Week 2 Recap: The Best Deal Of Your Life",
          },
        },
      ],
    },

    // ============================================================
    // SERIES 3 — THE BEST EXPERIENCE OF YOUR LIFE
    // November 2–8, 2026
    // ============================================================

    {
      title: "The Best Experience",
      church_lessons: [
        {
          lesson_number: 1,
          series_id: 403,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-02T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Recovering Our Sight",
      church_lessons: [
        {
          lesson_number: 2,
          series_id: 403,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-03T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Created To Grow",
      church_lessons: [
        {
          lesson_number: 3,
          series_id: 403,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-04T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "A New Heart",
      church_lessons: [
        {
          lesson_number: 4,
          series_id: 403,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-05T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Born Into Holiness",
      church_lessons: [
        {
          lesson_number: 5,
          series_id: 403,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-06T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Born Of The Spirit",
      church_lessons: [
        {
          lesson_number: 6,
          series_id: 403,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-07T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "A Life Of Faith",
      church_lessons: [
        {
          lesson_number: 7,
          series_id: 403,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-08T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "The Best Experience Of Your Life (Recap)",
      church_lessons: [
        {
          lesson_number: 8,
          series_id: 403,
        },
      ],
      lessons_events: [
        {
          lessons_events_speakers: [
            {
              user_id: speakerId,
            },
          ],
          events: {
            timestamp: new Date("2026-11-08T13:00:00-08:00"),
            location: "Jesus' Disciples Family Church",
            information:
              "Life Class Module 1 Week 3 Recap: The Best Experience Of Your Life",
          },
        },
      ],
    },

    // ============================================================
    // SERIES 4 — LIFE IS A BATTLE
    // November 9–15, 2026
    // ============================================================

    {
      title: "The Enemy",
      church_lessons: [
        {
          lesson_number: 1,
          series_id: 404,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-09T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "A Life Of Conquest",
      church_lessons: [
        {
          lesson_number: 2,
          series_id: 404,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-10T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Our Secret Weapon",
      church_lessons: [
        {
          lesson_number: 3,
          series_id: 404,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-11T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "All My Sins Are Forgiven",
      church_lessons: [
        {
          lesson_number: 4,
          series_id: 404,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-12T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Whiter Than Snow",
      church_lessons: [
        {
          lesson_number: 5,
          series_id: 404,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-13T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "As If I Had Never Sinned",
      church_lessons: [
        {
          lesson_number: 6,
          series_id: 404,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-14T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Set Apart For God",
      church_lessons: [
        {
          lesson_number: 7,
          series_id: 404,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-15T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Life Is A Battle (Recap)",
      church_lessons: [
        {
          lesson_number: 8,
          series_id: 404,
        },
      ],
      lessons_events: [
        {
          lessons_events_speakers: [
            {
              user_id: speakerId,
            },
          ],
          events: {
            timestamp: new Date("2026-11-15T13:00:00-08:00"),
            location: "Jesus' Disciples Family Church",
            information: "Life Class Module 1 Week 4 Recap: Life Is A Battle",
          },
        },
      ],
    },

    // ============================================================
    // SERIES 5 — ENCOUNTER
    // November 16–22, 2026
    // ============================================================

    {
      title: "After The Encounter",
      church_lessons: [
        {
          lesson_number: 1,
          series_id: 405,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-16T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "180 Degrees",
      church_lessons: [
        {
          lesson_number: 2,
          series_id: 405,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-17T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Take Hold Of What Is Yours",
      church_lessons: [
        {
          lesson_number: 3,
          series_id: 405,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-18T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "The Best Medicine",
      church_lessons: [
        {
          lesson_number: 4,
          series_id: 405,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-19T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Protect Your Freedom",
      church_lessons: [
        {
          lesson_number: 5,
          series_id: 405,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-20T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Change Your Nation, Twelve People At A Time",
      church_lessons: [
        {
          lesson_number: 6,
          series_id: 405,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-21T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Holy Spirit, I Need You!",
      church_lessons: [
        {
          lesson_number: 7,
          series_id: 405,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-22T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Encounter (Recap)",
      church_lessons: [
        {
          lesson_number: 8,
          series_id: 405,
        },
      ],
      lessons_events: [
        {
          lessons_events_speakers: [
            {
              user_id: speakerId,
            },
          ],
          events: {
            timestamp: new Date("2026-11-22T13:00:00-08:00"),
            location: "Jesus' Disciples Family Church",
            information: "Life Class Module 1 Week 5 Recap: Encounter",
          },
        },
      ],
    },

    // ============================================================
    // SERIES 6 — DISCOVER THE SECRET THAT WILL TRANSFORM YOUR LIFE
    // November 23–29, 2026
    // ============================================================

    {
      title: "We Need To Relate To God Personally",
      church_lessons: [
        {
          lesson_number: 1,
          series_id: 406,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-23T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Hearing God (I)",
      church_lessons: [
        {
          lesson_number: 2,
          series_id: 406,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-24T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Hearing God (II)",
      church_lessons: [
        {
          lesson_number: 3,
          series_id: 406,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-25T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Speaking To God (I)",
      church_lessons: [
        {
          lesson_number: 4,
          series_id: 406,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-26T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Speaking To God (II)",
      church_lessons: [
        {
          lesson_number: 5,
          series_id: 406,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-27T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Devotional",
      church_lessons: [
        {
          lesson_number: 6,
          series_id: 406,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-28T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Book Of Dreams",
      church_lessons: [
        {
          lesson_number: 7,
          series_id: 406,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-29T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Discover The Secret That Will Transform Your Life (Recap)",
      church_lessons: [
        {
          lesson_number: 8,
          series_id: 406,
        },
      ],
      lessons_events: [
        {
          lessons_events_speakers: [
            {
              user_id: speakerId,
            },
          ],
          events: {
            timestamp: new Date("2026-11-29T13:00:00-08:00"),
            location: "Jesus' Disciples Family Church",
            information:
              "Life Class Module 1 Week 6 Recap: Discover The Secret That Will Transform Your Life",
          },
        },
      ],
    },

    // ============================================================
    // SERIES 7 — YOUR DECISIONS DEFINE YOU
    // November 30 – December 6, 2026
    // ============================================================

    {
      title: "Decide To Serve Jesus With All Your Heart",
      church_lessons: [
        {
          lesson_number: 1,
          series_id: 407,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-30T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Decide To Stand Firm When Under Attack",
      church_lessons: [
        {
          lesson_number: 2,
          series_id: 407,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-01T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Decide To Stand Firm Against Yourself",
      church_lessons: [
        {
          lesson_number: 3,
          series_id: 407,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-02T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Decide To Depend Completely On God",
      church_lessons: [
        {
          lesson_number: 4,
          series_id: 407,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-03T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Decide To Be A Mighty Warrior",
      church_lessons: [
        {
          lesson_number: 5,
          series_id: 407,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-04T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Decide To Obtain Victory",
      church_lessons: [
        {
          lesson_number: 6,
          series_id: 407,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-05T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Decide To Serve Others",
      church_lessons: [
        {
          lesson_number: 7,
          series_id: 407,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-06T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Your Decisions Define You (Recap)",
      church_lessons: [
        {
          lesson_number: 8,
          series_id: 407,
        },
      ],
      lessons_events: [
        {
          lessons_events_speakers: [
            {
              user_id: speakerId,
            },
          ],
          events: {
            timestamp: new Date("2026-12-06T13:00:00-08:00"),
            location: "Jesus' Disciples Family Church",
            information:
              "Life Class Module 1 Week 7 Recap: Your Decisions Define You",
          },
        },
      ],
    },

    // ============================================================
    // SERIES 8 — NOTHING LESS THAN GOD'S BEST
    // December 7–13, 2026
    // ============================================================

    {
      title: "I Am A Son Or Daughter",
      church_lessons: [
        {
          lesson_number: 1,
          series_id: 408,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-07T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "The Best Inheritance",
      church_lessons: [
        {
          lesson_number: 2,
          series_id: 408,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-08T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "The Will Of God",
      church_lessons: [
        {
          lesson_number: 3,
          series_id: 408,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-09T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Accepting God's Thoughts",
      church_lessons: [
        {
          lesson_number: 4,
          series_id: 408,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-10T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "God Is My Strength",
      church_lessons: [
        {
          lesson_number: 5,
          series_id: 408,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-11T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "A Renewed Mind",
      church_lessons: [
        {
          lesson_number: 6,
          series_id: 408,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-12T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "I Am An Overcomer",
      church_lessons: [
        {
          lesson_number: 7,
          series_id: 408,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-13T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Nothing Less Than God's Best (Recap)",
      church_lessons: [
        {
          lesson_number: 8,
          series_id: 408,
        },
      ],
      lessons_events: [
        {
          lessons_events_speakers: [
            {
              user_id: speakerId,
            },
          ],
          events: {
            timestamp: new Date("2026-12-13T13:00:00-08:00"),
            location: "Jesus' Disciples Family Church",
            information:
              "Life Class Module 1 Week 8 Recap: Nothing Less Than God's Best",
          },
        },
      ],
    },

    // ============================================================
    // SERIES 9 — A NEW BEGINNING
    // December 14–20, 2026
    // ============================================================

    {
      title: "Starting Over",
      church_lessons: [
        {
          lesson_number: 1,
          series_id: 409,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-14T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Who Has This Opportunity?",
      church_lessons: [
        {
          lesson_number: 2,
          series_id: 409,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-15T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Can I Do It Now?",
      church_lessons: [
        {
          lesson_number: 3,
          series_id: 409,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-16T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "Jesus' Example",
      church_lessons: [
        {
          lesson_number: 4,
          series_id: 409,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-17T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "What That Means For Me",
      church_lessons: [
        {
          lesson_number: 5,
          series_id: 409,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-18T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "You Decide!",
      church_lessons: [
        {
          lesson_number: 6,
          series_id: 409,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-19T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "New Life",
      church_lessons: [
        {
          lesson_number: 7,
          series_id: 409,
        },
      ],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-20T13:00:00-08:00"),
          },
        },
      ],
    },

    {
      title: "A New Beginning (Recap)",
      church_lessons: [
        {
          lesson_number: 8,
          series_id: 409,
        },
      ],
      lessons_events: [
        {
          lessons_events_speakers: [
            {
              user_id: speakerId,
            },
          ],
          events: {
            timestamp: new Date("2026-12-20T13:00:00-08:00"),
            location: "Jesus' Disciples Family Church",
            information: "Life Class Module 1 Week 9 Recap: A New Beginning",
          },
        },
      ],
    },
  ]);
}
