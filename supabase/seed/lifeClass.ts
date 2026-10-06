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
      is_user_completable: true,
      church_lessons: [{ lesson_number: 1, series_id: 401 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-19T13:00:00-07:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "An Opportunity For An Encounter",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 2, series_id: 401 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-20T13:00:00-07:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Is It Too Late For Reconciliation?",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 3, series_id: 401 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-21T13:00:00-07:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "An Opportunity For Restoration",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 4, series_id: 401 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-22T13:00:00-07:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "An Opportunity For Provision",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 5, series_id: 401 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-23T13:00:00-07:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Who Is Jesus?",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 6, series_id: 401 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-24T13:00:00-07:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Four Opportunities",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 7, series_id: 401 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-25T13:00:00-07:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Learning From Our Mistakes — Week 1 Recap",
      is_user_completable: false,
      church_lessons: [{ lesson_number: 8, series_id: 401 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-25T13:00:00-07:00"),
            location: "Jesus' Disciples Family Church",
            event_type_id: 4,
          },
          lessons_events_speakers: [{ user_id: speakerId }],
        },
      ],
    },

    // ============================================================
    // SERIES 2 — THE BEST DEAL OF YOUR LIFE
    // October 26–November 1, 2026
    // ============================================================

    {
      title: "The Best Deal Of Your Life",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 1, series_id: 402 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-26T13:00:00-07:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Jesus Took Our Place",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 2, series_id: 402 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-27T13:00:00-07:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "The Miracle Of Exchange",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 3, series_id: 402 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-28T13:00:00-07:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Freedom At The Foot Of The Cross",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 4, series_id: 402 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-29T13:00:00-07:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Every Last Drop Of Blood",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 5, series_id: 402 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-30T13:00:00-07:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "The Incomparable Price Jesus Paid For Me",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 6, series_id: 402 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-10-31T13:00:00-07:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Contemplating The Cross",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 7, series_id: 402 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-01T13:00:00-07:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "The Best Deal Of Your Life — Week 2 Recap",
      is_user_completable: false,
      church_lessons: [{ lesson_number: 8, series_id: 402 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-01T13:00:00-07:00"),
            location: "Jesus' Disciples Family Church",
            event_type_id: 4,
          },
          lessons_events_speakers: [{ user_id: speakerId }],
        },
      ],
    },

    // ============================================================
    // SERIES 3 — THE BEST EXPERIENCE OF YOUR LIFE
    // November 2–8, 2026
    // ============================================================

    {
      title: "The Best Experience",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 1, series_id: 403 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-02T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Recovering Our Sight",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 2, series_id: 403 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-03T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Created To Grow",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 3, series_id: 403 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-04T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "A New Heart",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 4, series_id: 403 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-05T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Born Into Holiness",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 5, series_id: 403 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-06T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Born Of The Spirit",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 6, series_id: 403 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-07T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "A Life Of Faith",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 7, series_id: 403 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-08T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "The Best Experience Of Your Life — Week 3 Recap",
      is_user_completable: false,
      church_lessons: [{ lesson_number: 8, series_id: 403 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-08T13:00:00-08:00"),
            location: "Jesus' Disciples Family Church",
            event_type_id: 4,
          },
          lessons_events_speakers: [{ user_id: speakerId }],
        },
      ],
    },

    // ============================================================
    // SERIES 4 — LIFE IS A BATTLE
    // November 9–15, 2026
    // ============================================================

    {
      title: "The Enemy",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 1, series_id: 404 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-09T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "A Life Of Conquest",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 2, series_id: 404 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-10T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Our Secret Weapon",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 3, series_id: 404 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-11T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "All My Sins Are Forgiven",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 4, series_id: 404 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-12T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Whiter Than Snow",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 5, series_id: 404 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-13T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "As If I Had Never Sinned",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 6, series_id: 404 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-14T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Set Apart For God",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 7, series_id: 404 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-15T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Life Is A Battle — Week 4 Recap",
      is_user_completable: false,
      church_lessons: [{ lesson_number: 8, series_id: 404 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-15T13:00:00-08:00"),
            location: "Jesus' Disciples Family Church",
            event_type_id: 4,
          },
          lessons_events_speakers: [{ user_id: speakerId }],
        },
      ],
    },

    // ============================================================
    // SERIES 5 — ENCOUNTER
    // November 16–22, 2026
    // ============================================================

    {
      title: "After The Encounter",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 1, series_id: 405 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-16T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "180 Degrees",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 2, series_id: 405 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-17T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Take Hold Of What Is Yours",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 3, series_id: 405 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-18T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "The Best Medicine",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 4, series_id: 405 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-19T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Protect Your Freedom",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 5, series_id: 405 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-20T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Change Your Nation, Twelve People At A Time",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 6, series_id: 405 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-21T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Holy Spirit, I Need You!",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 7, series_id: 405 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-22T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Encounter — Week 5 Recap",
      is_user_completable: false,
      church_lessons: [{ lesson_number: 8, series_id: 405 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-22T13:00:00-08:00"),
            location: "Jesus' Disciples Family Church",
            event_type_id: 4,
          },
          lessons_events_speakers: [{ user_id: speakerId }],
        },
      ],
    },

    // ============================================================
    // SERIES 6 — DISCOVER THE SECRET THAT WILL TRANSFORM YOUR LIFE
    // November 23–29, 2026
    // ============================================================

    {
      title: "We Need To Relate To God Personally",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 1, series_id: 406 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-23T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Hearing God (I)",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 2, series_id: 406 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-24T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Hearing God (II)",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 3, series_id: 406 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-25T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Speaking To God (I)",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 4, series_id: 406 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-26T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Speaking To God (II)",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 5, series_id: 406 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-27T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Devotional",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 6, series_id: 406 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-28T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Book Of Dreams",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 7, series_id: 406 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-29T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Discover The Secret That Will Transform Your Life — Week 6 Recap",
      is_user_completable: false,
      church_lessons: [{ lesson_number: 8, series_id: 406 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-29T13:00:00-08:00"),
            location: "Jesus' Disciples Family Church",
            event_type_id: 4,
          },
          lessons_events_speakers: [{ user_id: speakerId }],
        },
      ],
    },

    // ============================================================
    // SERIES 7 — YOUR DECISIONS DEFINE YOU
    // November 30–December 6, 2026
    // ============================================================

    {
      title: "Decide To Serve Jesus With All Your Heart",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 1, series_id: 407 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-11-30T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Decide To Stand Firm When Under Attack",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 2, series_id: 407 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-01T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Decide To Stand Firm Against Yourself",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 3, series_id: 407 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-02T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Decide To Depend Completely On God",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 4, series_id: 407 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-03T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Decide To Be A Mighty Warrior",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 5, series_id: 407 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-04T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Decide To Obtain Victory",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 6, series_id: 407 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-05T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Decide To Serve Others",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 7, series_id: 407 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-06T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Your Decisions Define You — Week 7 Recap",
      is_user_completable: false,
      church_lessons: [{ lesson_number: 8, series_id: 407 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-06T13:00:00-08:00"),
            location: "Jesus' Disciples Family Church",
            event_type_id: 4,
          },
          lessons_events_speakers: [{ user_id: speakerId }],
        },
      ],
    },

    // ============================================================
    // SERIES 8 — NOTHING LESS THAN GOD'S BEST
    // December 7–13, 2026
    // ============================================================

    {
      title: "I Am A Son Or Daughter",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 1, series_id: 408 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-07T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "The Best Inheritance",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 2, series_id: 408 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-08T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "The Will Of God",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 3, series_id: 408 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-09T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Accepting God's Thoughts",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 4, series_id: 408 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-10T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "God Is My Strength",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 5, series_id: 408 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-11T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "A Renewed Mind",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 6, series_id: 408 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-12T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "I Am An Overcomer",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 7, series_id: 408 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-13T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Nothing Less Than God's Best — Week 8 Recap",
      is_user_completable: false,
      church_lessons: [{ lesson_number: 8, series_id: 408 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-13T13:00:00-08:00"),
            location: "Jesus' Disciples Family Church",
            event_type_id: 4,
          },
          lessons_events_speakers: [{ user_id: speakerId }],
        },
      ],
    },

    // ============================================================
    // SERIES 9 — A NEW BEGINNING
    // December 14–20, 2026
    // ============================================================

    {
      title: "Starting Over",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 1, series_id: 409 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-14T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Who Has This Opportunity?",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 2, series_id: 409 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-15T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Can I Do It Now?",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 3, series_id: 409 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-16T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "Jesus' Example",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 4, series_id: 409 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-17T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "What That Means For Me",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 5, series_id: 409 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-18T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "You Decide!",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 6, series_id: 409 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-19T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "New Life",
      is_user_completable: true,
      church_lessons: [{ lesson_number: 7, series_id: 409 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-20T13:00:00-08:00"),
            location: null,
            event_type_id: 4,
          },
        },
      ],
    },
    {
      title: "A New Beginning — Week 9 Recap",
      is_user_completable: false,
      church_lessons: [{ lesson_number: 8, series_id: 409 }],
      lessons_events: [
        {
          events: {
            timestamp: new Date("2026-12-20T13:00:00-08:00"),
            location: "Jesus' Disciples Family Church",
            event_type_id: 4,
          },
          lessons_events_speakers: [{ user_id: speakerId }],
        },
      ],
    },
  ]);
}
