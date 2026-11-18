import { useBibleClient } from "@youversion/platform-react-hooks";
import { useCallback, useEffect, useState } from "react";

type Book = {
  title: string;
  usfm: string;
};

const BOOKS: Record<string, Book> = {
  genesis: { title: "Genesis", usfm: "GEN" },
  exodus: { title: "Exodus", usfm: "EXO" },
  leviticus: { title: "Leviticus", usfm: "LEV" },
  numbers: { title: "Numbers", usfm: "NUM" },
  deuteronomy: { title: "Deuteronomy", usfm: "DEU" },
  joshua: { title: "Joshua", usfm: "JOS" },
  judges: { title: "Judges", usfm: "JDG" },
  ruth: { title: "Ruth", usfm: "RUT" },
  "1samuel": { title: "1 Samuel", usfm: "1SA" },
  "2samuel": { title: "2 Samuel", usfm: "2SA" },
  "1kings": { title: "1 Kings", usfm: "1KI" },
  "2kings": { title: "2 Kings", usfm: "2KI" },
  "1chronicles": { title: "1 Chronicles", usfm: "1CH" },
  "2chronicles": { title: "2 Chronicles", usfm: "2CH" },
  ezra: { title: "Ezra", usfm: "EZR" },
  nehemiah: { title: "Nehemiah", usfm: "NEH" },
  esther: { title: "Esther", usfm: "EST" },
  job: { title: "Job", usfm: "JOB" },
  psalm: { title: "Psalms", usfm: "PSA" },
  psalms: { title: "Psalms", usfm: "PSA" },
  proverbs: { title: "Proverbs", usfm: "PRO" },
  ecclesiastes: { title: "Ecclesiastes", usfm: "ECC" },
  songofsolomon: { title: "Song of Solomon", usfm: "SNG" },
  songofsongs: { title: "Song of Solomon", usfm: "SNG" },
  isaiah: { title: "Isaiah", usfm: "ISA" },
  jeremiah: { title: "Jeremiah", usfm: "JER" },
  lamentations: { title: "Lamentations", usfm: "LAM" },
  ezekiel: { title: "Ezekiel", usfm: "EZK" },
  daniel: { title: "Daniel", usfm: "DAN" },
  hosea: { title: "Hosea", usfm: "HOS" },
  joel: { title: "Joel", usfm: "JOL" },
  amos: { title: "Amos", usfm: "AMO" },
  obadiah: { title: "Obadiah", usfm: "OBA" },
  jonah: { title: "Jonah", usfm: "JON" },
  micah: { title: "Micah", usfm: "MIC" },
  nahum: { title: "Nahum", usfm: "NAM" },
  habakkuk: { title: "Habakkuk", usfm: "HAB" },
  zephaniah: { title: "Zephaniah", usfm: "ZEP" },
  haggai: { title: "Haggai", usfm: "HAG" },
  zechariah: { title: "Zechariah", usfm: "ZEC" },
  malachi: { title: "Malachi", usfm: "MAL" },
  matthew: { title: "Matthew", usfm: "MAT" },
  mark: { title: "Mark", usfm: "MRK" },
  luke: { title: "Luke", usfm: "LUK" },
  john: { title: "John", usfm: "JHN" },
  acts: { title: "Acts", usfm: "ACT" },
  romans: { title: "Romans", usfm: "ROM" },
  "1corinthians": { title: "1 Corinthians", usfm: "1CO" },
  "2corinthians": { title: "2 Corinthians", usfm: "2CO" },
  galatians: { title: "Galatians", usfm: "GAL" },
  ephesians: { title: "Ephesians", usfm: "EPH" },
  philippians: { title: "Philippians", usfm: "PHP" },
  colossians: { title: "Colossians", usfm: "COL" },
  "1thessalonians": { title: "1 Thessalonians", usfm: "1TH" },
  "2thessalonians": { title: "2 Thessalonians", usfm: "2TH" },
  "1timothy": { title: "1 Timothy", usfm: "1TI" },
  "2timothy": { title: "2 Timothy", usfm: "2TI" },
  titus: { title: "Titus", usfm: "TIT" },
  philemon: { title: "Philemon", usfm: "PHM" },
  hebrews: { title: "Hebrews", usfm: "HEB" },
  james: { title: "James", usfm: "JAS" },
  "1peter": { title: "1 Peter", usfm: "1PE" },
  "2peter": { title: "2 Peter", usfm: "2PE" },
  "1john": { title: "1 John", usfm: "1JN" },
  "2john": { title: "2 John", usfm: "2JN" },
  "3john": { title: "3 John", usfm: "3JN" },
  jude: { title: "Jude", usfm: "JUD" },
  revelation: { title: "Revelation", usfm: "REV" },
};

export type ParsedPassageReference = {
  passageReference: string;
  usfm: string;
};

export type BiblePassageText = {
  passageReference: string;
  text: string;
};

export type UseBiblePassageResult = {
  passages: BiblePassageText[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
};

function normalizeBookName(name: string): string {
  return name.toLowerCase().replace(/[\s.]/g, "");
}

export function parseBiblePassageReferences(
  passage: string,
): ParsedPassageReference[] {
  const parts = passage.split(",").map((part) => part.trim());
  if (!passage.trim() || parts.some((part) => !part)) {
    throw new Error("Enter one or more Bible references separated by commas.");
  }

  const parsed: ParsedPassageReference[] = [];
  let currentBook: Book | undefined;
  let currentChapter: number | undefined;

  for (const part of parts) {
    const fullReference = part.match(
      /^(.*?)\s+(\d+):(\d+)(?:-(?:(\d+):)?(\d+))?$/,
    );

    let book = currentBook;
    let chapter: number;
    let startVerse: number;
    let endChapter: number | undefined;
    let endVerse: number | undefined;

    if (fullReference) {
      book = BOOKS[normalizeBookName(fullReference[1])];
      if (!book) {
        throw new Error(`Unknown Bible book: ${fullReference[1]}`);
      }

      chapter = Number(fullReference[2]);
      startVerse = Number(fullReference[3]);
      endChapter = fullReference[4]
        ? Number(fullReference[4])
        : chapter;
      endVerse = fullReference[5] ? Number(fullReference[5]) : undefined;
    } else {
      const continuation = part.match(
        /^(\d+)(?::(\d+))?(?:-(?:(\d+):)?(\d+))?$/,
      );
      if (!continuation || !book || currentChapter === undefined) {
        throw new Error(`Invalid Bible reference: ${part}`);
      }

      chapter = continuation[2]
        ? Number(continuation[1])
        : currentChapter;
      startVerse = continuation[2]
        ? Number(continuation[2])
        : Number(continuation[1]);
      endChapter = continuation[4]
        ? Number(continuation[3] ?? chapter)
        : undefined;
      endVerse = continuation[4]
        ? Number(continuation[4])
        : continuation[3]
          ? Number(continuation[3])
          : undefined;
    }

    if (
      chapter < 1 ||
      startVerse < 1 ||
      (endChapter !== undefined && endChapter < chapter) ||
      (endVerse !== undefined &&
        endChapter === chapter &&
        endVerse < startVerse)
    ) {
      throw new Error(`Invalid Bible reference: ${part}`);
    }

    const referenceEnd =
      endVerse === undefined
        ? ""
        : `-${endChapter !== chapter ? `${endChapter}:` : ""}${endVerse}`;
    const passageReference = `${book.title} ${chapter}:${startVerse}${referenceEnd}`;
    const usfmEnd =
      endVerse === undefined
        ? ""
        : `-${endChapter !== chapter ? `${endChapter}.` : ""}${endVerse}`;

    parsed.push({
      passageReference,
      usfm: `${book.usfm}.${chapter}.${startVerse}${usfmEnd}`,
    });

    currentBook = book;
    currentChapter = endChapter ?? chapter;
  }

  return parsed;
}

export function useBiblePassage(
  passageReference: string,
): UseBiblePassageResult {
  const bibleClient = useBibleClient();
  const [passages, setPassages] = useState<BiblePassageText[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [requestNumber, setRequestNumber] = useState(0);

  const refetch = useCallback(() => {
    setRequestNumber((current) => current + 1);
  }, []);

  useEffect(() => {
    let isActive = true;

    if (!passageReference.trim()) {
      setPassages([]);
      setLoading(false);
      setError(null);
      return () => {
        isActive = false;
      };
    }

    setPassages([]);
    setLoading(true);
    setError(null);

    void (async () => {
      try {
        const references = parseBiblePassageReferences(passageReference);
        const results = await Promise.all(
          references.map(async ({ passageReference, usfm }) => {
            const result = await bibleClient.getPassage(
              111,
              usfm,
              "text",
              true,
              false,
            );
            return { passageReference, text: result.content };
          }),
        );

        if (isActive) setPassages(results);
      } catch (requestError: unknown) {
        if (isActive) {
          setError(
            requestError instanceof Error
              ? requestError
              : new Error(String(requestError)),
          );
        }
      } finally {
        if (isActive) setLoading(false);
      }
    })();

    return () => {
      isActive = false;
    };
  }, [bibleClient, passageReference, requestNumber]);

  return { passages, loading, error, refetch };
}
