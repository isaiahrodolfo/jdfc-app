import type { createSeedClient } from "@snaplet/seed";
import { getPacificSundayTimestamp } from "./eventDuration";

const series = [
  {
    name: "Pastored In His Love",
    lessons: [
      "Jesus Is My Shepherd",
      "Cultivating A Relationship With God",
      "The Power Of Praise And Worship",
      "Strengthened In God",
      "Spiritual Warfare",
      "The Redemptive Power Of The Blood",
      "The Bible Will Transform Your Life",
      "The Anointing Of The Holy Spirit",
      "The Blessing Of Prosperity",
      "Building My Church",
    ],
  },
  {
    name: "The Power Of A Vision",
    lessons: [
      "What Is Vision",
      "The Principles Of G12",
      "A Firm Foundation",
      "The Vision Of The Government Of Twelve (G12)",
      "Forming The Best Team",
      "Successful Leadership",
      "The Art Of Winning",
      "Blessing Through The Cell Group",
      "Ready To Consolidate",
      "The Power Of The 144",
    ],
  },
  {
    name: "A Winning Strategy",
    lessons: [
      "The Present Glory",
      "Key Principles Of Winning",
      "The Power Of Evangelism",
      "Effective Evangelism",
      "The Anointing To Win",
      "Compassion",
      "Generosity",
      "Faith",
      "The Cell Vision",
      "Cell Structure And Development",
    ],
  },
  {
    name: "Families With A Purpose",
    lessons: [
      "Family",
      "The Roles Of Parents And Children",
      "Inner Healing In The Family",
      "Seven Columns For A Happy Family",
      "The Blessing Of Fatherhood",
      "Is This The Right Person?",
      "True Love",
      "Seven Steps For A Successful Courtship",
      "Strengthen Communication In Your Marriage",
      "God's 10 Family Commandments",
    ],
  },
  {
    name: "Effective Leadership",
    lessons: [
      "A Leader Of Faith",
      "The Leader's Love For The Sheep",
      "A Leader That Builds",
      "A Leader With The Heart Of A Servant",
      "A Leader Controlled By The Holy Spirit",
      "The Leader And Preaching Of The Word",
      "The Leader And Counseling",
      "The Leader And Supervision",
      "The Price Of Leadership",
      "The Leader And The Formation Of Disciples",
    ],
  },
  {
    name: "The Holy Spirit Within Me",
    lessons: [
      "Immersed In His Spirit",
      "Preparing To Receive The Holy Spirit",
      "Knowing The Holy Spirit",
      "The Fruit Of The Spirit (Part 1)",
      "The Fruit Of The Spirit (Part 2)",
      "The Fruit Of The Spirit (Part 3)",
      "Introduction To The Gifts Of The Holy Spirit",
      "Gifts Of Revelation",
      "Gifts Of Power",
      "Gifts Of Inspiration",
    ],
  },
];

export async function seedDestinyTraining(
  seed: Awaited<ReturnType<typeof createSeedClient>>,
  speakerId: string,
) {
  const seriesIds = series.map((_, index) => 501 + index);
  await seed.series(
    series.map(({ name }, index) => ({
      id: seriesIds[index],
      name,
      series_number: index + 1,
      track_id: 5,
    })),
  );

  let weekOffset = 0;
  const lessons = series.flatMap(({ lessons: seriesLessons }, seriesIndex) =>
    seriesLessons.map((title, lessonIndex) => {
      const timestampStart = getPacificSundayTimestamp(weekOffset);
      const timestampEnd = new Date(timestampStart.getTime() + 60 * 60 * 1000);
      weekOffset += 1;
      weekOffset = weekOffset % 10;

      return {
        title,
        is_user_completable: false,
        church_lessons: [
          {
            lesson_number: lessonIndex + 1,
            series_id: seriesIds[seriesIndex],
          },
        ],
        lessons_events: [
          {
            events: {
              title: "Destiny Training",
              timestamp_start: timestampStart,
              timestamp_end: timestampEnd,
              location: "Jesus' Disciples Family Church",
              event_type_id: 5,
            },
            lessons_events_speakers: [{ user_id: speakerId }],
          },
        ],
      };
    }),
  );

  await seed.lessons(lessons);
}
