import { parseBiblePassageReferences } from "./useBiblePassage";

describe("parseBiblePassageReferences", () => {
  it("parses a single verse reference", () => {
    expect(parseBiblePassageReferences("Genesis 1:1")).toEqual([
      { passageReference: "Genesis 1:1", usfm: "GEN.1.1" },
    ]);
  });

  it("expands shorthand verse ranges and preserves their order", () => {
    expect(parseBiblePassageReferences("Mark 6:6-7, 12-13")).toEqual([
      { passageReference: "Mark 6:6-7", usfm: "MRK.6.6-7" },
      { passageReference: "Mark 6:12-13", usfm: "MRK.6.12-13" },
    ]);
  });

  it("carries the book and chapter into shorthand references", () => {
    expect(
      parseBiblePassageReferences("Judges 3:12, 15-16, 18-21, 26-27, 30"),
    ).toEqual([
      { passageReference: "Judges 3:12", usfm: "JDG.3.12" },
      { passageReference: "Judges 3:15-16", usfm: "JDG.3.15-16" },
      { passageReference: "Judges 3:18-21", usfm: "JDG.3.18-21" },
      { passageReference: "Judges 3:26-27", usfm: "JDG.3.26-27" },
      { passageReference: "Judges 3:30", usfm: "JDG.3.30" },
    ]);
  });

  it("resets the book and chapter when a new full reference is provided", () => {
    expect(
      parseBiblePassageReferences(
        "Genesis 1:1-30, Exodus 1:1-2, 3-4",
      ),
    ).toEqual([
      { passageReference: "Genesis 1:1-30", usfm: "GEN.1.1-30" },
      { passageReference: "Exodus 1:1-2", usfm: "EXO.1.1-2" },
      { passageReference: "Exodus 1:3-4", usfm: "EXO.1.3-4" },
    ]);
  });

  it("rejects unknown books and invalid shorthand", () => {
    expect(() => parseBiblePassageReferences("NotABook 1:1")).toThrow(
      "Unknown Bible book",
    );
    expect(() => parseBiblePassageReferences("12-13")).toThrow(
      "Invalid Bible reference",
    );
  });
});
