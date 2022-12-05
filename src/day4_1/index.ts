import fs from "fs";
import assert from "assert";
import path from "path";

function getFullyOverlappingPairs(pairs: [string, string][]): number {
  const overlappingPairs = pairs.filter(([sections1, sections2]) => {
    const minmax1 = sections1.split("-").map(Number);
    const minmax2 = sections2.split("-").map(Number);

    // First section range overlaps second section range completely
    if (minmax1[0] <= minmax2[0] && minmax1[1] >= minmax2[1]) {
      return true;
    }

    // Second section range overlaps first section range completely
    if (minmax2[0] <= minmax1[0] && minmax2[1] >= minmax1[1]) {
      return true;
    }

    return false;
  });

  return overlappingPairs.length;
}

assert.strictEqual(
  getFullyOverlappingPairs([
    ["2-4", "6-8"],
    ["2-3", "4-5"],
    ["5-7", "7-9"],
    ["2-8", "3-7"],
    ["6-6", "4-6"],
    ["2-6", "4-8"],
  ]),
  2
);

fs.readFile(
  path.join(__dirname, "..", "..", "src", "day4_1", "input"),
  "utf8",
  function (err: NodeJS.ErrnoException, data: string) {
    if (err) throw err;

    const input = data
      .trim()
      .split("\n")
      .map((x) => x.split(","));
    console.log(getFullyOverlappingPairs(input as [string, string][]));
  }
);
