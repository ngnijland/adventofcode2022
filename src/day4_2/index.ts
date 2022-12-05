import fs from "fs";
import assert from "assert";
import path from "path";

function getOverlappingPairs(pairs: [string, string][]): number {
  const overlappingPairs = pairs.filter((ranges) => {
    const range1 = ranges[0].split("-").map(Number);
    const range2 = ranges[1].split("-").map(Number);

    // First section range overlaps second section range completely
    if (range1[0] <= range2[1] && range1[1] >= range2[0]) {
      return true;
    }

    // Second section range overlaps first section range completely
    if (range2[1] <= range1[0] && range2[0] >= range1[1]) {
      return true;
    }

    return false;
  });

  return overlappingPairs.length;
}

assert.strictEqual(
  getOverlappingPairs([
    ["2-4", "6-8"],
    ["2-3", "4-5"],
    ["5-7", "7-9"],
    ["2-8", "3-7"],
    ["6-6", "4-6"],
    ["2-6", "4-8"],
  ]),
  4
);

fs.readFile(
  path.join(__dirname, "..", "..", "src", "day4_2", "input"),
  "utf8",
  function (err: NodeJS.ErrnoException, data: string) {
    if (err) throw err;

    const input = data
      .trim()
      .split("\n")
      .map((x) => x.split(","));
    console.log(getOverlappingPairs(input as [string, string][]));
  }
);
